import { connectDB } from "../../../utils/database";
import { generateToken } from "../../../utils/auth";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        await connectDB();
        const { usernameOrEmail, password } = req.body;

        console.log("username %s -> password %s", usernameOrEmail, password);
        const token = await generateToken(req.body);
        console.log(token);
        res.status(200).json({ msg: req.method });
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message });
      }
      break;

    default:
      res.status(400).json({ msg: "BAD REQUEST" });
  }
};
