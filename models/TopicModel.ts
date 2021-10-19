import { Schema, models, model } from "mongoose";

const TopicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 350,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    videoLink: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      maxLength: 250,
    },
    tClass: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const TopicModel = models.Topic || model("Topic", TopicSchema);

export default TopicModel;
