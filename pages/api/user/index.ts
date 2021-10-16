import { connectDB } from "../../../utils/database";
import {
  buildError,
  generateToken,
  prepareUser,
  userRequired,
  validateEmail,
  validateFullName,
  validateUserPassword,
} from "../../../utils/auth";
import User from "../../../models/UserModel";
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
        await getUser(req, res);
        break;

      case "PUT":
        break;
      case "PATCH":
        await updateUser(req, res);
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

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = userRequired(req, res);

  console.log(userId);
  const { username, fullName, email, dpUrl, aboutMe } = req.body;

  if (!username || !fullName || !email)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  if (!validateEmail(email))
    return res.status(400).json({
      msg: CONSTANTS.MESSAGES.FORM_ERROR,
      errors: [buildError("email", CONSTANTS.MESSAGES.FORM.EMAIL)],
    });

  if (!validateFullName(fullName))
    return res.status(400).json({
      msg: CONSTANTS.MESSAGES.FORM_ERROR,
      errors: [buildError("fullName", CONSTANTS.MESSAGES.FORM.FULL_NAME)],
    });

  const oldUserEmailAcct = await User.findOne({ email });
  if (oldUserEmailAcct && oldUserEmailAcct.username !== username)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.EMAIL_EXIST });

  const userData = await User.findOne({ username }).select("-password");
  if (!userData)
    return res.status(404).json({ msg: CONSTANTS.MESSAGES.ACCOUNT_NOT_FOUND });

  userData.fullName = toTitleCase(fullName);
  userData.email = email;
  if (dpUrl) userData.dp_url = dpUrl;
  if (aboutMe) userData.aboutMe = aboutMe;

  await userData.save();
  return res.status(200).json({
    user: prepareUser(userData),
    msg: CONSTANTS.MESSAGES.ACCOUNT_UPDATED,
  });
};

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {};
