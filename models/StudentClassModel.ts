import { Schema, models, model } from "mongoose";

const StudentClassSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sClass: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
  },
  { timestamps: true }
);

const StudentClassModel =
  models.StudentClass || model("StudentClass", StudentClassSchema);

export default StudentClassModel;
