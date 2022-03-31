import mongoose from "mongoose";
import {
  ICustomPaginationOptions,
  IPagingData,
  IClassCardProps,
} from "./../../../utils/types";
import { userRequired } from "./../../../utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../utils/database";
import Topic from "../../../models/TopicModel";
import User from "../../../models/UserModel";
import Class from "../../../models/ClassModel";
import StudentClass from "../../../models/StudentClassModel";
import { CONSTANTS, PER_PAGE } from "../../../utils/constants";
import { errorHandler } from "../../../utils/handler";
import {
  getCustomPaginationData,
  getPaginatedData,
  getParamsForGetRequest,
} from "../../../utils/pagination";
import { createUser } from "../auth/signup";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
          case "class":
            await addStudentClass(req, res);
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
            case "classstatus":
              await getStudentClassStatus(req, res);
              break;
            case "myclass":
              await getStudentClassesApi(req, res);
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
            throw Error("Unknown Patch Type for Student PATCH method");
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
            throw Error("Unknown Delete Type for Student DELETE method");
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

export default handler;

////********************************* */
const addStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res);
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
  userRequired(req, res);
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

const addStudentClass = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res);

  const { username, classSlug } = req.body;

  if (!username || !classSlug)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const student = await User.findOne({ username });
  const classD = await Class.findOne({ slug: classSlug });

  if (!student || !classD)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const classExist = await StudentClass.findOne({ student: student._id });
  if (classExist) {
    return res.status(200).json({ msg: "Class exist already" });
  } else {
    await StudentClass.create({
      student: student._id,
      sClass: classD._id,
    });

    return res
      .status(201)
      .json({ msg: CONSTANTS.MESSAGES.STUDENT_CLASS_ADDED });
  }
};
const getStudentClassStatus = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  userRequired(req, res);

  const { username, classSlug } = req.query;

  if (!username || !classSlug)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const student = await User.findOne({ username });
  const classD = await Class.findOne({ slug: classSlug });

  if (!student || !classD)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const classExist = await StudentClass.findOne({
    student: student._id,
    sClass: classD._id,
  });
  console.log(classExist);
  if (classExist) {
    return res.status(200).json({ status: true });
  } else {
    return res.status(200).json({ status: false });
  }
};

const getStudentClassesApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userId = userRequired(req, res);
  const { limit, page, searchTerm } = getParamsForGetRequest(req);
  const options = {
    match: { student: mongoose.Types.ObjectId(userId ? userId : "") },
  };
  try {
    const pg = await getStudentClasses(page, limit, options);
    return res.status(200).json(pg);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: CONSTANTS.MESSAGES.UNKNOWN_ERROR });
  }
};

export const getStudentClasses = async (
  page: number,
  perPage: number,
  options?: ICustomPaginationOptions
): Promise<IPagingData<IClassCardProps>> => {
  const pipeline = [
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
        localField: "sClass",
        foreignField: "tClass",
        as: "topics",
      },
    },
    {
      $project: {
        createdAt: 1,
        classData: {
          title: 1,
          shortDesc: 1,
          price: 1,
          slug: 1,
          createdAt: 1,
          thumbnail: 1,
        },
        topics: 1,
      },
    },
  ];

  const data = await getCustomPaginationData(
    page,
    perPage,
    pipeline,
    StudentClass,
    options
  );

  if (data?.results?.length > 0) {
    const results = data?.results?.map((d: any) => ({
      img: d?.classData?.thumbnail,
      addedOn: d?.createdAt,
      topicsCount: d?.topics?.length,
      priceTag: d?.classData?.price,
      title: d?.classData?.title,
      desc: d?.classData?.shortDesc,
      slug: d?.classData?.slug,
    }));

    return {
      results,
      paging: data?.paging,
    };
  }
  return {
    results: [],
    paging: {
      page: 1,
      perPage: PER_PAGE,
      totalItems: 0,
      totalPages: 1,
    },
  };
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2mb",
    },
  },
};
