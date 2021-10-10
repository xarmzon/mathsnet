import { Schema, models, model } from "mongoose";

const ClassSchema = new Schema(
  {
    title: {
      type: String,
      index: true,
      required: true,
      maxLength: 200,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      maxLength: 250,
    },
    thumbnail: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
      minLength: 0,
    },
    subMonths: {
      type: Number,
      required: true,
      minLength: 0,
    },
  },
  { timestamps: true }
);

const ClassModel = models.Class || model("Class", ClassSchema);

export default ClassModel;
