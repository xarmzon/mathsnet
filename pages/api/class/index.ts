import { userRequired } from "./../../../utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../utils/database";
import User from "../../../models/UserModel";
import Class from "../../../models/ClassModel";
import { CONSTANTS, PER_PAGE } from "../../../utils/constants";
import { errorHandler } from "../../../utils/handler";
import slugify from "slugify";
import {
  getPaginatedData,
  getPagination,
  getParamsForGetRequest,
} from "../../../utils/pagination";
import { IClassOptions } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
            case "single":
              await getClass(req, res);
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

export default handler;

//************************************** */
const addClass = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res, CONSTANTS.USER_TYPES.ADMIN);
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

  let options: IClassOptions = {};
  if (searchTerm) {
    options = { match: { title: { $regex: searchTerm, $options: "i" } } };
  }
  const pg = await getClassesData(page, limit, options);
  return res.status(200).json(pg);
};

const getClass = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: classId } = req.query;

  if (!classId)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const options: IClassOptions = {
    match: { _id: classId },
  };

  const pg = await getClassData(options);
  return res.status(200).json(pg);
};

const updateClass = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res, CONSTANTS.USER_TYPES.ADMIN);
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
  userRequired(req, res, CONSTANTS.USER_TYPES.ADMIN);

  const { id } = req.query;
  if (!id) return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const deleted = await Class.deleteOne({ _id: id });
  if (deleted.deletedCount && deleted.deletedCount > 0)
    return res.status(200).json({ msg: CONSTANTS.MESSAGES.CLASS_DELETED });
  else return res.status(404).json({ msg: CONSTANTS.MESSAGES.CLASS_NOT_FOUND });
};

export const getClassesData = async (
  page: number,
  perPage: number,
  options?: IClassOptions
) => {
  const { limit, offset } = getPagination(page, perPage);

  const pipeline: any[] = [
    {
      $match: options?.match ? options.match : {},
    },

    {
      $lookup: {
        from: "topics",
        let: {
          id: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$tClass", "$$id"],
              },
            },
          },
          {
            $lookup: {
              from: "classes",
              localField: "tClass",
              foreignField: "_id",
              as: "tClass",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "by",
              foreignField: "_id",
              as: "by",
            },
          },
          {
            $unwind: {
              path: "$tClass",
            },
          },
          {
            $unwind: {
              path: "$by",
            },
          },
          {
            $project: {
              by: {
                aboutMe: 1,
                dp_url: 1,
                email: 1,
                fullName: 1,
              },
              tClass: {
                desc: 1,
                price: 1,
                slug: 1,
                subMonths: 1,
                title: 1,
                thumbnail: 1,
                shortDesc: 1,
              },
              createdAt: 1,
              description: 1,
              slug: 1,
              thumbnail: 1,
              title: 1,
              videoLink: 1,
            },
          },
        ],
        as: "topics",
      },
    },
    { $skip: offset },
    { $limit: limit },
  ];

  options?.sample && pipeline.splice(1, 0, { $sample: options.sample });
  options?.sort &&
    pipeline.splice(pipeline.length - 2, 0, {
      $sort: { [options.sort.by]: options.sort.order },
    });

  const countPipeline = [
    ...pipeline.filter(
      (_, i) => i !== pipeline.length - 1 && i !== pipeline.length - 2
    ),
    {
      $count: "totalItems",
    },
  ];

  const results = await Class.aggregate(pipeline).exec();
  const resultsCount = await Class.aggregate(countPipeline).exec();
  const totalItems = resultsCount[0]?.totalItems
    ? resultsCount[0]?.totalItems
    : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return {
    results,
    paging: {
      totalPages,
      page: page + 1,
      totalItems,
      perPage,
    },
  };
};

export const getClassData = async (options: IClassOptions) => {
  const data = await getClassesData(0, 1, options);
  return data.results[0];
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};
