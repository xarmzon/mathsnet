import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 250,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    video: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      maxLength: 250,
    },
    tClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  },
  { timestamps: true }
);

const TopicModel =
  mongoose.models.Topic || mongoose.model("Topic", TopicSchema);

export default TopicModel;
