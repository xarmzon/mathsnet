import mongoose from "mongoose";
import UserModel from "../models/UserModel";
export const connectDB = async () => {
  return await mongoose.connect(
    process.env.DATABASE_URI || "mongodb://localhost:27017/mathsnet",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

export const createUser = async (userData) => {
  const user = new UserModel(userData);
  return await user.save();
};
