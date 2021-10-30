import { useState, useRef, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import dateformat from "dateformat";
import { ROUTES, CONSTANTS } from "../../utils/constants";
import api from "../../utils/fetcher";
import { formatPrice } from "../../utils";
export interface PaystackProps {
  email: string;
  amount: number;
  reference?: string;
  classSlug: string;
  username: string;
  onComplete: (msg: string) => void;
}

type MType = "success" | "error" | "info";
interface IMessage {
  text: string;
  type: MType;
}

const PaystackPayment = ({
  onComplete,
  classSlug,
  email,
  amount,
  username,
  reference = "",
}: PaystackProps) => {
  const [message, setMessage] = useState<IMessage>({ text: "", type: "info" });
  const [paymentText, setPaymentText] = useState<string>("Make Payment");
  const [refNum, setRefNum] = useState<string>(() => {
    if (reference && reference.length > 0) {
      return reference;
    }

    let ref = dateformat(new Date(), "isoUtcDateTime");
    ref = ref
      .replace("-", "")
      .replace(":", "")
      .replace("-", "")
      .replace(":", "")
      .split("Z")[0];
    return CONSTANTS.APP_NAME + "-" + ref;
  });

  const makePayment = usePaystackPayment({
    email,
    amount,
    reference: refNum,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "",
  });

  useEffect(() => {
    if (message.text && message.text.length > 0) {
      setTimeout(() => setMessage({ text: "", type: "info" }), 6000);
    }
  }, [message.text, message]);

  useEffect(() => {
    if (paymentText === "Verify") {
      verifyPayment();
    } else if (paymentText === "Successful") {
      setTimeout(() => setPaymentText("Make Payment"), 1000);
    }
  }, [paymentText]);

  const onSuccess = (ref: string) => {
    //console.log(ref);
    setPaymentText("Verify");
  };
  const performPayment = async () => {
    switch (paymentText) {
      case "Make Payment":
        setPaymentText("Loading...");
        //add Payment data to database
        try {
          const { data } = await api.post(`${ROUTES.API.PAYMENT}`, {
            classSlug,
            refNum,
            username,
          });
          console.log(data);
          //make payment
          makePayment(
            (ref: string) => onSuccess(ref), //onSuccess callback
            () => setPaymentText("Make Payment") //onClose callback
          );
        } catch (e) {
          console.log(e);
          setMessage({ text: "Adding Payment Failed", type: "error" });
          setTimeout(() => setPaymentText("Make Payment"), 2000);
        }

        break;
      case "Verify Payment":
        verifyPayment();
        break;

      case "Add Class":
        addClass();
        break;
    }
  };

  const addClass = async () => {};

  const verifyPayment = async () => {
    setPaymentText("Validating...");
    try {
      const { data } = await api.get(
        `${ROUTES.API.PAYMENT}?get_type=verify&reference=${refNum}`
      );
      setMessage({ text: "Payment Added", type: "success" });
      updatePayment();
      setPaymentText("Done");
    } catch (e) {
      console.log(e?.response?.msg);
      setMessage({ text: "Payment Verification Failed", type: "error" });
      setPaymentText("Verify Payment");
    }
  };

  const updatePayment = async () => {
    try {
      const { data } = await api.patch(`${ROUTES.API.PAYMENT}`, {
        reference: refNum,
        status: true,
      });
      onComplete(data.msg);
    } catch (e) {
      setMessage({ text: "Failed to update Payment status", type: "error" });
      console.log(e);
    }
  };
  return (
    <div className="space-y-3 flex flex-col items-center">
      <p className="text-xl md:text-2xl text-center font-bold text-secondary">
        &#8358;{formatPrice(amount / 100)}
      </p>
      <p className="text-xs md:text-sm text-center font-bold text-secondary">
        Reference Number<span className="block italic">{refNum}</span>
      </p>
      <button
        onClick={performPayment}
        type="button"
        className="py-2 px-4 bg-primary text-primary-100 hover:bg-ascent-light hover:text-primary transition duration-500"
      >
        {paymentText}
      </button>
      {message.text && message.text.length > 0 && (
        <p
          className={`text-center text-xs md:text-sm ${
            message.type === "success"
              ? "text-green-600"
              : message.type === "error"
              ? "text-red-600"
              : "text-secondary"
          }`}
        >
          {message.text}
        </p>
      )}
      <img
        width="200px"
        className="object-cover"
        src="/assets/images/paystack-badge-cards-ngn.png"
      />
    </div>
  );
};

export default PaystackPayment;
