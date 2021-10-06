import { connectDB } from "../../../utils/database";
import {
  generateToken,
  prepareUser,
  validateUserPassword,
} from "../../../utils/auth";
import User from "../../../models/UserModel";
import { CONSTANTS } from "../../../utils/constants";
import { errorHandler } from "../../../utils/handler";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      try {
        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password)
          return res
            .status(400)
            .json({ msg: CONSTANTS.MESSAGES.INVALID_REQUEST });

        await connectDB();

        const user = await User.findOne({
          $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });

        if (!user)
          return res.status(404).json({ msg: CONSTANTS.MESSAGES.NO_USER });

        const isValidPass = await validateUserPassword(password, user.password);
        if (!isValidPass)
          return res.status(400).json({ msg: CONSTANTS.MESSAGES.LOGIN_ERR });

        const claims = {
          id: user._id,
          userType: user.userType,
        };
        delete user.password;
        const token = generateToken(claims);

        res.status(200).json({
          token,
          msg: CONSTANTS.MESSAGES.LOGIN_SUC,
          user: prepareUser(user),
        });
      } catch (err) {
        errorHandler(err, res);
      }
      break;

    default:
      res.status(405).json({ msg: CONSTANTS.MESSAGES.METHOD_NOT_ALLOWED });
  }
};
