import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../utils/database";
import Topic from "../../../models/TopicModel";
import User from "../../../models/UserModel";
import Class from "../../../models/ClassModel";
import { CONSTANTS, PER_PAGE } from "../../../utils/constants";
import { errorHandler } from "../../../utils/handler";
import slugify from "slugify";
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
          case "topic":
            await addTopic(req, res);
            break;
          case "instructor":
            await addInstructor(req, res);
            break;
          default:
            throw Error("Uknown Post Type for Instructor POST method");
        }
        break;

      case "GET":
        const { get_type } = req.query;
        if (get_type) {
          switch (get_type) {
            case "featured":
              await getFeaturedTopics(req, res);
            case "instructor":
              await getInstructors(req, res);
              break;
            default:
              throw Error("Invalid Request for GET method type query");
          }
        } else {
          await getTopics(req, res);
        }
        break;

      case "PUT":
        break;

      case "PATCH":
        const { patch_type } = req.body;
        if (!patch_type)
          return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });
        switch (patch_type) {
          case "topic":
            await updateTopic(req, res);
            break;
          case "instructor":
            await updateInstructor(req, res);
            break;
          default:
            throw Error("Uknown Patch Type for Instructor PATCH method");
        }
        break;

      case "DELETE":
        const { delete_type } = req.query;
        if (!delete_type)
          return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });
        switch (delete_type) {
          case "topic":
            await deleteTopic(req, res);
            break;
          case "instructor":
            await deleteInstructor(req, res);
            break;
          default:
            throw Error("Uknown Delete Type for Instructor DELETE method");
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

/**** INSTRUCTORS */
const addInstructor = async (req: NextApiRequest, res: NextApiResponse) => {
  return await createUser(req, res);
};
const getInstructors = async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit, page, searchTerm } = getParamsForGetRequest(req);
  let options = {};
  const removeItems = ["password"];
  if (searchTerm) {
    options = {
      $and: [
        {
          userType: CONSTANTS.USER_TYPES.INSTRUCTOR,
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
      userType: CONSTANTS.USER_TYPES.INSTRUCTOR,
    };
  }
  const pg = await getPaginatedData(page, limit, User, options, removeItems);
  //console.log(pg);
  return res.status(200).json(pg);
};
const updateInstructor = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ msg: CONSTANTS.MESSAGES.ACCOUNT_UPDATED });
};
const deleteInstructor = async (req: NextApiRequest, res: NextApiResponse) => {
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

/** TOPICS **/
const addTopic = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;
  if (
    !data.title ||
    !data.shortDesc ||
    !data.desc ||
    !data.price ||
    !data.subMonths
  )
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const classData = await Class.create({
    title: data.title,
    shortDesc: data.shortDesc,
    desc: data.desc,
    slug: slugify(data.title.toLowerCase()),
    thumbnail: data.displayImg ? data.displayImg : "",
    price: data.price,
    subMonths: data.subMonths,
  });
  res
    .status(201)
    .json({ data: classData, msg: CONSTANTS.MESSAGES.NEW_CLASS_SUCCESSFUL });
};

const getFeaturedTopics = async (req: NextApiRequest, res: NextApiResponse) => {
  const pipelines = [];

  //const classData = await Class.aggregate(pipelines).exec();
  const classData = {};
  return res
    .status(200)
    .json({ data: classData, msg: CONSTANTS.MESSAGES.FETCH_LOADING_SUCCESS });
};
const getTopics = async (req: NextApiRequest, res: NextApiResponse) => {
  let limit: number = req.query.limit
    ? parseInt(req.query.limit as string)
    : PER_PAGE;
  let page: number = req.query.page
    ? parseInt(req.query.page as string) - 1
    : 0;
  const searchTerm: string = req.query.search
    ? (req.query.search as string)
    : "";

  //console.log(searchTerm);
  let options = {};
  if (searchTerm) {
    options = { title: { $regex: searchTerm, $options: "i" } };
  }
  const pg = await getPaginatedData(page, limit, Class, options);
  //console.log(pg);
  return res.status(200).json(pg);
};

const getClass = async (req: NextApiRequest, res: NextApiResponse) => {};

const updateTopic = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;
  if (
    !data.title ||
    !data.shortDesc ||
    !data.desc ||
    !data.price ||
    !data.subMonths ||
    !data.id
  )
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const classData = await Class.findById(data.id);
  if (!classData)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.CLASS_NOT_FOUND });

  classData.title = data.title;
  classData.shortDesc = data.shortDesc;
  classData.desc = data.desc;
  classData.price = data.price;
  classData.subMonths = data.subMonths;
  classData.slug = slugify(data.title.toLowerCase());
  if (data.displayImg) classData.thumbnail = data.displayImg;

  await classData.save();
  return res.status(200).json({ msg: CONSTANTS.MESSAGES.CLASS_UPDATED });
};

const deleteTopic = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  //console.log(id);
  const deleted = await Class.deleteOne({ _id: id });
  //console.log(deleted);
  if (deleted.deletedCount && deleted.deletedCount > 0)
    return res.status(200).json({ msg: CONSTANTS.MESSAGES.CLASS_DELETED });
  else return res.status(404).json({ msg: CONSTANTS.MESSAGES.CLASS_NOT_FOUND });
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2mb",
    },
  },
};
