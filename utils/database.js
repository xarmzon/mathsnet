import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readState) {
    console.log("Already connected");
    return;
  }
  const db = await mongoose.connect(
    process.env.DATABASE_URI || "mongodb://localhost:27017/mssnunilorin-cbt",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  return db;
};
