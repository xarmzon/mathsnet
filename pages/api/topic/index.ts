import { userRequired } from "./../../../utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../utils/database";
import User from "../../../models/UserModel";
import Topic from "../../../models/TopicModel";
import { CONSTANTS, PER_PAGE } from "../../../utils/constants";
import { errorHandler } from "../../../utils/handler";
import {
  getPaginatedData,
  getPagination,
  getParamsForGetRequest,
} from "../../../utils/pagination";
import { ITopicOptions } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  try {
    switch (req.method) {
      case "GET":
        const { type } = req.query;
        if (type) {
          switch (type) {
            case "featured":
              await getFeaturedTopics(req, res);
              break;
            case "single":
              await getTopic(req, res);
            default:
              throw Error("Invalid Request");
          }
        } else {
          await getTopics(req, res);
        }
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

export const getFeaturedTopics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {};
export const getTopics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {};
export const getTopic = async (req: NextApiRequest, res: NextApiResponse) => {};

export const getTopicsData = async (
  page: number,
  perPage: number,
  options?: ITopicOptions
) => {
  const { limit, offset } = getPagination(page, perPage);
  const pipeline: any[] = [
    {
      $match: options?.match ? options.match : {},
    },

    {
      $lookup: {
        from: "classes",
        localField: "tClass",
        foreignField: "_id",
        as: "classData",
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
        path: "$classData",
      },
    },
    {
      $unwind: {
        path: "$by",
      },
    },
    {
      $project: {
        createdAt: 1,
        description: 1,
        slug: 1,
        thumbnail: 1,
        videoLink: 1,
        title: 1,
        classData: {
          price: 1,
          title: 1,
          shortDesc: 1,
          slug: 1,
        },
        by: {
          fullName: 1,
          dp_url: 1,
        },
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

  const results = await Topic.aggregate(pipeline).exec();
  const resultsCount = await Topic.aggregate(countPipeline).exec();
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
