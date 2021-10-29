import { useState, useRef, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import dateformat from "dateformat";
import { CONSTANTS } from "../../utils/constants";
export interface PaystackProps {
  email: string;
  amount: number;
  reference?: string;
}
const PaystackPayment = ({ email, amount, reference = "" }: PaystackProps) => {
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
    if (paymentText === "Verify") {
      verifyPayment();
    } else if (paymentText === "Successful") {
      setTimeout(() => setPaymentText("Make Payment"), 2000);
    }
  }, [paymentText]);

  const onSuccess = (ref: string) => {
    console.log(ref);
    setPaymentText("Verify");
  };
  const performPayment = async () => {
    switch (paymentText) {
      case "Make Payment":
        setPaymentText("Loading...");
        makePayment(
          (ref: string) => onSuccess(ref), //onSuccess callback
          () => setPaymentText("Make Payment") //onClose callback
        );
        break;
      case "Verify Payment":
        break;
    }
  };

  const verifyPayment = async () => {
    setPaymentText("Validating...");
    setTimeout(() => setPaymentText("Successful"), 2000);
  };
  return (
    <div className="space-y-3 flex flex-col items-center">
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
      <img
        width="200px"
        className="object-cover"
        src="/assets/images/paystack-badge-cards-ngn.png"
      />
    </div>
  );
};

export default PaystackPayment;
