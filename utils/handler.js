import { CONSTANTS } from "./constants";
export const errorHandler = (err, res) => {
  console.log(err);
  return res.status(501).json({ msg: CONSTANTS.MESSAGES.UNKNOWN_ERROR });
};
