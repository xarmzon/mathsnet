import mongoose from "mongoose";
import { CONSTANTS } from "../utils/constants";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userType: {
    type: String,
    default: CONSTANTS.USER_TYPES.STUDENT,
  },
  dp_url: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
