import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../utils/database";
import Topic from "../../../models/TopicModel";
import User from "../../../models/UserModel";
import Class from "../../../models/ClassModel";
import { CONSTANTS, PER_PAGE } from "../../../utils/constants";
import { errorHandler } from "../../../utils/handler";
import {
  getPaginatedData,
  getParamsForGetRequest,
} from "../../../utils/pagination";
import { createUser } from "../auth/signup";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  try {
    switch (req.method) {
      case "POST":
        const { post_type } = req.body;
        if (!post_type)
          return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });
        switch (post_type) {
          case "student":
            await addStudent(req, res);
            break;
          default:
            throw Error("Uknown Post Type for Student POST method");
        }
        break;

      case "GET":
        const { get_type } = req.query;
        if (get_type) {
          switch (get_type) {
            case "student":
              await getStudents(req, res);
              break;
            default:
              throw Error("Invalid Request for GET method type query");
          }
        } else {
          return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });
        }
        break;

      case "PUT":
        break;

      case "PATCH":
        const { patch_type } = req.body;
        if (!patch_type)
          return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });
        switch (patch_type) {
          case "student":
            await updateStudent(req, res);
            break;
          default:
            throw Error("Uknown Patch Type for Student PATCH method");
        }
        break;

      case "DELETE":
        const { delete_type } = req.query;
        if (!delete_type)
          return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });
        switch (delete_type) {
          case "student":
            await deleteStudent(req, res);
            break;
          default:
            throw Error("Uknown Delete Type for Student DELETE method");
        }
        break;

      default:
        console.log("unknown method");
        res.status(405).json({ msg: CONSTANTS.MESSAGES.METHOD_NOT_ALLOWED });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: CONSTANTS.MESSAGES.UNKNOWN_ERROR });
  }
};

const addStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  return await createUser(req, res);
};
const getStudents = async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit, page, searchTerm } = getParamsForGetRequest(req);
  let options = {};
  const removeItems = ["password"];
  if (searchTerm) {
    options = {
      $and: [
        {
          userType: CONSTANTS.USER_TYPES.STUDENT,
        },
        {
          $or: [
            { fullName: { $regex: searchTerm, $options: "i" } },
            { username: { $regex: searchTerm, $options: "i" } },
          ],
        },
      ],
    };
  } else {
    options = {
      userType: CONSTANTS.USER_TYPES.STUDENT,
    };
  }
  const pg = await getPaginatedData(page, limit, User, options, removeItems);
  //console.log(pg);
  return res.status(200).json(pg);
};
const updateStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ msg: CONSTANTS.MESSAGES.ACCOUNT_UPDATED });
};
const deleteStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  //console.log(id);
  const deleted = await User.deleteOne({ _id: id });
  //console.log(deleted);
  if (deleted.deletedCount && deleted.deletedCount > 0)
    return res.status(200).json({ msg: CONSTANTS.MESSAGES.ACCOUNT_DELETED });
  else
    return res.status(404).json({ msg: CONSTANTS.MESSAGES.ACCOUNT_NOT_FOUND });
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2mb",
    },
  },
};