import React, { useState } from "react";
import { IClassData } from "../../pages/[class_slug]";
import { useAppSelector } from "../../redux/store";
import { CONSTANTS, ROUTES } from "../../utils/constants";

import Link from "next/link";
import api from "../../utils/fetcher";
import PaystackPayment from "../general/PaystackPayment";
import useCheckPaymentState from "../../hooks/useCheckPaymentState";
import { errorMessage } from "../../utils/errorHandler";
import Loader from "../general/Loader";

export interface IPaymentBox {
  classData: IClassData;
}

const PaymentBox = ({ classData }: IPaymentBox) => {
  const { user, loading, loggedIn } = useAppSelector((state) => state.auth);
  const [addClassText, setAddClassText] = useState<string>("Add Class");

  const {
    showPaymentButton,
    loadingPaymentState,
    message,
    showAddClass,
    setShowPaymentButton,
    setShowAddClass,
    setMessage,
  } = useCheckPaymentState({ classData });

  const addStudentClass = async () => {
    switch (addClassText) {
      case "Add Class":
        setAddClassText("Loading...");
        try {
          const { data } = await api.post(`${ROUTES.API.STUDENT}`, {
            classSlug: classData.slug,
            username: user.username,
            post_type: "class",
          });
          setMessage({ text: data.msg, type: "success" });
          setShowAddClass(false);
        } catch (e) {
          setMessage({ text: errorMessage(e), type: "error" });
          setAddClassText("Add Class");
          console.log(e);
        }
        break;
    }
  };
  const onCompletePayment = async (msg: string) => {
    setMessage({ text: msg, type: "success" });
    setShowPaymentButton(false);
    setShowAddClass(true);
    addStudentClass();
  };
  return (
    <div className="text-center w-full flex justify-center px-3">
      {loadingPaymentState || loading ? (
        <Loader />
      ) : loggedIn ? (
        user.userType === CONSTANTS.USER_TYPES.STUDENT && (
          <div>
            {classData.title &&
              classData.price &&
              classData.price > 0 &&
              showPaymentButton && (
                <PaystackPayment
                  username={user.username}
                  classSlug={classData.slug}
                  onComplete={(msg: string) => onCompletePayment(msg)}
                  amount={classData.price * 100}
                  email={user.email}
                />
              )}
            {classData.title &&
              classData.price &&
              classData.price > 0 &&
              showAddClass && (
                <button
                  type="button"
                  className="py-2 px-4 bg-primary text-primary-100 hover:bg-ascent-light hover:text-primary transition duration-500"
                  onClick={addStudentClass}
                >
                  {addClassText}
                </button>
              )}
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
          </div>
        )
      ) : (
        classData.title &&
        classData.price &&
        classData.price > 0 && (
          <p className="my-1 text-xs md:text-sm">
            Contents for registered users only.{" "}
            <Link href={ROUTES.AUTH.SIGNUP}>
              <a className="text-red-600">Login/Register</a>
            </Link>{" "}
            in order to add/access this class{" "}
          </p>
        )
      )}
    </div>
  );
};

export default PaymentBox;
