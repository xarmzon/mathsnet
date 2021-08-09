import { connectDB } from "../../../utils/database";
import { generateToken } from "../../../utils/auth";
import User from "../../../models/UserModel";
import { CONSTANTS } from "../../../utils/constants";
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        const { usernameOrEmail, password } = req.body;
        await connectDB();
        //console.log("username %s -> password %s", usernameOrEmail, password);
        let user = await User.findOne({ username: usernameOrEmail });
        if (!user) user = await User.findOne({ email: usernameOrEmail });
        if (!user) {
          res.status(404).json({ msg: CONSTANTS.MESSAGES.NO_USER });
        } else {
          const token = generateToken(req.body);
          console.log(token);
          res.status(200).json({ token, msg: req.method });
        }
      } catch (err) {
        console.log(err);
        res.status(501).json({ msg: CONSTANT.MESSAGES.UNKNOWN_ERROR });
      }
      break;

    default:
      res.status(405).json({ msg: CONSTANTS.MESSAGES.METHOD_NOT_ALLOWED });
  }
};
