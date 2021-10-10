import { Schema, models, model } from "mongoose";

const CommentsSchema = new Schema(
  {
    by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    for: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CommentModel = models.Comments || model("Comment", CommentsSchema);

export default CommentModel;
