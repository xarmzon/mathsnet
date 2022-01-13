import React, { useEffect, useState } from "react";
import { IClassData } from "../pages/[class_slug]";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { CONSTANTS, PAYMENT_STATUS, ROUTES } from "../utils/constants";
import api from "../utils/fetcher";

export interface IUseCheckPaymentState {
  classData: IClassData;
}
type MType = "success" | "error" | "info";
export interface IMessage {
  text: string;
  type: MType;
}

export interface IUseCheckPaymentStateReturn {
  loadingPaymentState: boolean;
  showPaymentButton: boolean;
  showAddClass: boolean;
  message: IMessage;
  setMessage: React.Dispatch<React.SetStateAction<IMessage>>;
  setShowAddClass: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingPaymentState: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPaymentButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const useCheckPaymentState = ({
  classData,
}: IUseCheckPaymentState): IUseCheckPaymentStateReturn => {
  const { user, loading, loggedIn } = useAppSelector((state) => state.auth);
  const [loadingPaymentState, setLoadingPaymentState] =
    useState<boolean>(false);
  const [showPaymentButton, setShowPaymentButton] = useState<boolean>(false);
  const [showAddClass, setShowAddClass] = useState<boolean>(false);
  const [message, setMessage] = useState<IMessage>({
    text: "",
    type: "info",
  });

  useEffect(() => {
    const checkPaymentState = async () => {
      if (loading) {
        setLoadingPaymentState(true);
      } else {
        if (user) {
          if (user.userType === CONSTANTS.USER_TYPES.STUDENT) {
            try {
              const { data: classStatus } = await api.get(
                `${ROUTES.API.STUDENT}?get_type=classstatus&username=${user.username}&classSlug=${classData.slug}`
              );
              if (!classStatus.status) {
                try {
                  const {
                    data: { status },
                  } = await api.get(
                    `${ROUTES.API.PAYMENT}?get_type=status&student=${user.username}&classSlug=${classData.slug}`
                  );
                  //console.log(status);
                  if (status === PAYMENT_STATUS.UNPAID) {
                    setShowPaymentButton(true);
                    setMessage({
                      text: "Last payment for this class was unsuccessful",
                      type: "error",
                    });
                  } else {
                    setShowAddClass(true);
                  }
                } catch (e) {
                  console.log(e?.response);
                  setMessage({
                    text:
                      e?.response?.data?.msg ||
                      "Failed to verify payment for this class.",
                    type: "error",
                  });
                  setShowPaymentButton(true);
                }
              }
            } catch (e) {
              setMessage({
                text: "Error loading state for this class.",
                type: "error",
              });
            }
            setLoadingPaymentState(false);
          }
        } else {
          setLoadingPaymentState(false);
          setShowPaymentButton(false);
          setShowAddClass(false);
          //console.log("user is not here");
        }
      }
    };
    checkPaymentState();
  }, [user, loading, loggedIn]);

  useEffect(() => {
    if (message.text && message.text.length > 0) {
      setTimeout(() => setMessage({ text: "", type: "info" }), 15000);
    }
  }, [message.text, message]);

  return {
    showAddClass,
    showPaymentButton,
    message,
    loadingPaymentState,
    setLoadingPaymentState,
    setMessage,
    setShowAddClass,
    setShowPaymentButton,
  };
};

export default useCheckPaymentState;
