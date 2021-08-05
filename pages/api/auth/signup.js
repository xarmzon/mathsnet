import { CONSTANTS } from "../../../utils/constants";

export default async (req, res) => {
  switch (req.method) {
      case "POST":
          const { fullName, username, email, password } = req.body
          return res.status(201).json({...req.body})
      break;

    default:
      return res.status(400).json({ msg: CONSTANTS.MESSAGES.INVALID_REQUEST });
  }
};
