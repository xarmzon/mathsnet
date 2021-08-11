import { CONSTANTS } from "../../../utils/constants";
import User from "../../../models/UserModel";
import { createUser, connectDB } from "../../../utils/database";
import { errorHandler } from "../../../utils/handler";
import { hashPassword, validateRegForm } from "../../../utils/auth";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        await connectDB();
        const { fullName, username, email, password } = req.body;
        if (!fullName || !username || !email || !password)
          return res
            .status(400)
            .json({ msg: CONSTANTS.MESSAGES.INVALID_REQUEST });

        const errors = await validateRegForm(req.body);

        if (errors.length > 0) return res.status(400).json({ msg: errors });

        const oldUser = await User.findOne({ $or: [{ username }, { email }] });

        if (oldUser)
          return res
            .status(409)
            .json({ msg: CONSTANTS.MESSAGES.ACCOUNT_EXIST });

        const passwordHash = await hashPassword(
          password,
          CONSTANTS.HASH_SALT_ROUND
        );
        const user = await User.create({
          fullName,
          username,
          email,
          password: passwordHash,
        });

        return res
          .status(201)
          .json({ msg: CONSTANTS.MESSAGES.NEW_ACCOUNT_SUCCESSFUL });
      } catch (err) {
        errorHandler(err);
      }
      break;

    default:
      res.status(405).json({ msg: CONSTANTS.MESSAGES.METHOD_NOT_ALLOWED });
  }
};
