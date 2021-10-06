import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    ends: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const SubscriptionModel =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);

export default SubscriptionModel;
