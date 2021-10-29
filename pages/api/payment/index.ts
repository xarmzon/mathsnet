import { connectDB } from "../../../utils/database";
import { buildError, userRequired } from "../../../utils/auth";
import User from "../../../models/UserModel";
import Class from "../../../models/ClassModel";
import Payment from "../../../models/PaymentModel";
import { CONSTANTS } from "../../../utils/constants";
import { errorHandler } from "../../../utils/handler";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyPaystackPayment } from "../../../utils/paystack";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();
    switch (req.method) {
      case "POST":
        await addPayment(req, res);
        break;
      case "GET":
        const { get_type } = req.query;

        if (get_type) {
          switch (get_type) {
            case "verify":
              verifyPayment(req, res);
              break;

            default:
              return res
                .status(400)
                .json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });
          }
        } else {
          await getPayment(req, res);
        }
        break;

      case "PUT":
        break;
      case "PATCH":
        await updatePayment(req, res);
        break;
      case "DELETE":
        break;

      default:
        res.status(405).json({ msg: CONSTANTS.MESSAGES.METHOD_NOT_ALLOWED });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: CONSTANTS.MESSAGES.UNKNOWN_ERROR });
  }
};

const verifyPayment = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res);

  const { reference } = req.query;
  if (!reference)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const ref: string = reference as string;
  const valid = await verifyPaystackPayment(ref);

  if (valid)
    return res.status(200).json({ msg: CONSTANTS.MESSAGES.PAYMENT_SUCC });
  else return res.status(403).json({ msg: CONSTANTS.MESSAGES.PAYMENT_ERR });
};

const addPayment = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res);

  const { classSlug, refNum, username } = req.body;

  const user = await User.findOne({ username });
  const classD = await Class.findOne({ slug: classSlug });

  if (!user || !classD)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  await Payment.create({
    reference: refNum,
    paidBy: user._id,
    paidFor: classD._id,
  });
  return res.status(200).json({
    msg: CONSTANTS.MESSAGES.PAYMENT_ADDED,
  });
};
const updatePayment = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res);

  const { reference, status } = req.body;

  if (!reference || !status)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const payment = await Payment.findOne({ reference });

  if (!payment)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  payment.paid = status;

  await payment.save();

  if (payment.paid) {
    return res.status(200).json({
      msg: CONSTANTS.MESSAGES.PAYMENT_ADDED,
    });
  } else {
    return res.status(200).json({
      msg: CONSTANTS.MESSAGES.PAYMENT_REMOVED,
    });
  }
};

const getPayment = async (req: NextApiRequest, res: NextApiResponse) => {};
