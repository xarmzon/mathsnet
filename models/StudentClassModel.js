import mongoose from "mongoose";

const StudentClassSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  },
  { timestamps: true }
);

const StudentClassModel =
  mongoose.models.StudentClass ||
  mongoose.model("StudentClass", StudentClassSchema);

export default StudentClassModel;
