import { connectDB } from "../../../utils/database";
import { buildError, userRequired } from "../../../utils/auth";
import User from "../../../models/UserModel";
import Class from "../../../models/ClassModel";
import StudentClass from "../../../models/StudentClassModel";
import Topic from "../../../models/TopicModel";
import Subscription from "../../../models/SubscriptionModel";
import Payment from "../../../models/PaymentModel";
import { CONSTANTS } from "../../../utils/constants";
import { errorHandler } from "../../../utils/handler";
import { NextApiRequest, NextApiResponse } from "next";
import { toTitleCase } from "../../../utils";
import mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();
    switch (req.method) {
      case "POST":
        break;
      case "GET":
        const { get_type } = req.query;
        if (!get_type)
          return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });
        switch (get_type) {
          case "user":
            await getUserBoardOverview(req, res);
            break;
          case "class":
            break;
          case "topic":
            break;
          default:
            return res
              .status(400)
              .json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });
        }
        break;

      case "PUT":
        break;
      case "PATCH":
        break;
      case "DELETE":
        break;

      default:
        res.status(405).json({ msg: CONSTANTS.MESSAGES.METHOD_NOT_ALLOWED });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: CONSTANTS.MESSAGES.UNKNOWN_ERROR });
  }
};

export default handler;

export const getUserBoardOverview = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userId = userRequired(req, res);

  const userData = await User.findById(userId);
  if (!userData)
    return res.status(404).json({ msg: CONSTANTS.MESSAGES.NO_USER });

  let overview = {};
  switch (userData.userType) {
    case CONSTANTS.USER_TYPES.STUDENT:
      overview["totalClass"] = await StudentClass.countDocuments({
        student: userId,
      });
      break;
    case CONSTANTS.USER_TYPES.INSTRUCTOR:
      const studentClassForInstructor = await StudentClass.aggregate([
        {
          $lookup: {
            from: "classes",
            localField: "sClass",
            foreignField: "_id",
            as: "classData",
          },
        },
        {
          $unwind: {
            path: "$classData",
          },
        },
        {
          $lookup: {
            from: "topics",
            let: {
              classId: "$classData._id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$tClass", "$$classId"],
                      },
                      {
                        $eq: [
                          "$by",
                          mongoose.Types.ObjectId(userId ? userId : ""),
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            as: "topicsByIns",
          },
        },
        {
          $project: {
            topicsByIns: 1,
            _id: 0,
          },
        },
      ]).exec();

      const totalStudentsCount = studentClassForInstructor.filter(
        (d: any) => d?.topicsByIns?.length > 0
      )?.length;
      overview["totalStudents"] = totalStudentsCount;
      overview["totalTopics"] = await Topic.countDocuments({ by: userId });
      break;
    case CONSTANTS.USER_TYPES.ADMIN:
      overview["totalStudents"] = await User.countDocuments({
        userType: CONSTANTS.USER_TYPES.STUDENT,
      });
      overview["totalInstructors"] = await User.countDocuments({
        userType: CONSTANTS.USER_TYPES.INSTRUCTOR,
      });
      overview["totalClasses"] = await Class.countDocuments({});
      overview["totalTopics"] = await Topic.countDocuments({});

      break;

    default:
      return res.status(404).json({ msg: CONSTANTS.MESSAGES.NO_USER });
  }
  return res.status(200).json(overview);
};
