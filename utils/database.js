import mongoose from "mongoose";
import UserModel from "../models/UserModel";

export const connectDB = async () => {
  if (mongoose.connections[0].readState) {
    console.log("Already connected");
    return;
  }
  const db = await mongoose.connect(
    process.env.DATABASE_URI || "mongodb://localhost:27017/mathsnet",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );
  return db;
};

export const createUser = async (userData) => {
  const user = new UserModel(userData);
  return await user.save();
};
