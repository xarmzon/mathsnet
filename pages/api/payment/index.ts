import { connectDB } from "../../../utils/database";
import { buildError, userRequired } from "../../../utils/auth";
import User from "../../../models/UserModel";
import Class from "../../../models/ClassModel";
import Payment from "../../../models/PaymentModel";
import { CONSTANTS, PAYMENT_STATUS } from "../../../utils/constants";
import { errorHandler } from "../../../utils/handler";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyPaystackPayment } from "../../../utils/paystack";
import { add } from "date-fns";
import {
  getCustomPaginationData,
  getParamsForGetRequest,
} from "../../../utils/pagination";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
              await verifyPayment(req, res);
              break;
            case "status":
              await getPaymentStatus(req, res);
              break;
            case "data":
              await getPayments(req, res);
            default:
              return res
                .status(400)
                .json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });
          }
        } else {
          await getPayments(req, res);
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

export default handler;

const verifyPayment = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res);

  const { reference } = req.query;
  if (!reference)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const ref: string = reference as string;
  const valid = await verifyPaystackPayment(ref);

  if (valid)
    return res.status(200).json({ msg: CONSTANTS.MESSAGES.PAYMENT_SUCC });
  else return res.status(401).json({ msg: CONSTANTS.MESSAGES.PAYMENT_ERR });
};

const addPayment = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res);

  const { classSlug, refNum, username } = req.body;

  if (!classSlug || !refNum || !username)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const user = await User.findOne({ username });
  const classD = await Class.findOne({ slug: classSlug });

  if (!user || !classD)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  if (!(await Payment.findOne({ reference: refNum }))) {
    await Payment.create({
      reference: refNum,
      paidBy: user._id,
      paidFor: classD._id,
      expiryDate: Date.now(),
    });
    return res.status(200).json({
      msg: CONSTANTS.MESSAGES.PAYMENT_ADDED,
    });
  } else {
    return res.status(200).json({ msg: "" });
  }
};
const updatePayment = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res);

  const { reference, status } = req.body;

  if (!reference || !status)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const payment = await Payment.findOne({ reference }).populate("paidFor");

  if (!payment)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  payment.paid = status;
  console.log(payment);
  //payment.expiryDate = add

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

const getPayments = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res, CONSTANTS.USER_TYPES.ADMIN);
  const { limit, page, searchTerm } = getParamsForGetRequest(req);
  const pg = {}; //await getCustomPaginationData(page,limit)
  return res.status(200).json(pg);
};
const getPaymentStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  userRequired(req, res);

  const { student, classSlug } = req.query;

  if (!classSlug || !student)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const user = await User.findOne({ username: student });
  const classD = await Class.findOne({ slug: classSlug });

  if (!user || !classD)
    return res.status(400).json({ msg: CONSTANTS.MESSAGES.BAD_REQUEST });

  const payment = await Payment.find({
    paidBy: user._id,
    paidFor: classD._id,
  }).sort("-createdAt");

  if (!payment || payment.length === 0)
    return res.status(404).json({ msg: CONSTANTS.MESSAGES.PAYMENT_NOT_FOUND2 });

  const paid = payment[0]["paid"];
  const expiryDate = payment[0]["expiryDate"];

  console.log(payment);
  console.log(paid);
  console.log(expiryDate);
  if (paid) {
    return res.status(200).json({ status: PAYMENT_STATUS.PAID });
  } else {
    return res.status(200).json({ status: PAYMENT_STATUS.UNPAID });
  }
};
