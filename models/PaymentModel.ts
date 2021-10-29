import { Schema, models, model } from "mongoose";

const PaymentSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    paidFor: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PaymentModel = models.Payment || model("Payment", PaymentSchema);

export default PaymentModel;
