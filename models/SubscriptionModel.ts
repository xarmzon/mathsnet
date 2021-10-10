import { Schema, models, model } from "mongoose";

const SubscriptionSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sClass: {
      type: Schema.Types.ObjectId,
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
  models.Subscription || model("Subscription", SubscriptionSchema);

export default SubscriptionModel;
