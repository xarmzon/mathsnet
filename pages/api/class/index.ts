import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../utils/database";
import User from "../../../models/UserModel";
import Class from "../../../models/ClassModel";
import { CONSTANTS, PER_PAGE } from "../../../utils/constants";
import { errorHandler } from "../../../utils/handler";
import slugify from "slugify";
import { getPaginatedData } from "../../../utils/pagination";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  try {
    switch (req.method) {
      case "POST":
        await addClass(req, res);
        break;

      case "GET":
        const { type } = req.query;
        if (type) {
          switch (type) {
            case "featured":
              await getFeaturedClasses(req, res);
              break;

            default:
              throw Error("Invalid Request");
          }
        } else {
          await getClasses(req, res);
        }
        break;

      case "PUT":
        break;

      case "PATCH":
        await updateClass(req, res);
        break;

      case "DELETE":
        await deleteClass(req, res);
        break;

      default:
        console.log("unknown method");
        return res
          .status(405)
          .json({ msg: CONSTANTS.MESSAGES.METHOD_NOT_ALLOWED });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: CONSTANTS.MESSAGES.UNKNOWN_ERROR });
  }
};

const addClass = async (req: NextApiRequest, res: NextApiResponse) => {
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

const getFeaturedClasses = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const pipelines = [];
  const classData = await Class.find({});
  //const classData = await Class.aggregate(pipelines).exec();

  return res
    .status(200)
    .json({ data: classData, msg: CONSTANTS.MESSAGES.FETCH_LOADING_SUCCESS });
};
const getClasses = async (req: NextApiRequest, res: NextApiResponse) => {
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

const updateClass = async (req: NextApiRequest, res: NextApiResponse) => {
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

const deleteClass = async (req: NextApiRequest, res: NextApiResponse) => {
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
      sizeLimit: "8mb",
    },
  },
};
