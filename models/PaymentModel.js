import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  paidFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
});

const PaymentModel =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

export default PaymentModel;
