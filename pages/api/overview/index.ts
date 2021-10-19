import { connectDB } from "../../../utils/database";
import { buildError, userRequired } from "../../../utils/auth";
import User from "../../../models/UserModel";
import Class from "../../../models/ClassModel";
import Topic from "../../../models/TopicModel";
import Subscription from "../../../models/SubscriptionModel";
import Payment from "../../../models/PaymentModel";
import { CONSTANTS } from "../../../utils/constants";
import { errorHandler } from "../../../utils/handler";
import { NextApiRequest, NextApiResponse } from "next";
import { toTitleCase } from "../../../utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
      break;
    case CONSTANTS.USER_TYPES.INSTRUCTOR:
      overview["totalStudents"] = 0
      overview["totalTopics"] = 0
      break;
    case CONSTANTS.USER_TYPES.ADMIN:
      overview["totalStudents"] =  await User.find({
          userType: CONSTANTS.USER_TYPES.STUDENT,
        }).count()
        overview["totalInstructors"] =  await User.find({
          userType: CONSTANTS.USER_TYPES.INSTRUCTOR,
        }).count()
        overview["totalClasses"] =  await Class.find({}).count()
        overview["totalTopics"] =  await Topic.find({}).count()
      
      break;

    default:
      return res.status(404).json({ msg: CONSTANTS.MESSAGES.NO_USER });
  }
  return res.status(200).json(overview);
};
