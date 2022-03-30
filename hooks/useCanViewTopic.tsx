import { IClassData } from "../utils/types";
import { useState, useEffect } from "react";
import { useAppSelector } from "../redux/store";
import api from "../utils/fetcher";
import { ROUTES, CONSTANTS } from "../utils/constants";

interface IUseCanViewTopic {
  classSlug: string;
  classPrice: number;
}

const useCanViewTopic = ({ classSlug, classPrice }: IUseCanViewTopic) => {
  const { user, loggedIn } = useAppSelector((state) => state.auth);
  const [canView, setCanView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checker = async () => {
      if (
        classPrice < 1 ||
        (loggedIn && user.userType !== CONSTANTS.USER_TYPES.STUDENT)
      ) {
        setLoading(false);
        setCanView(true);
        return;
      }
      if (!loggedIn) {
        setLoading(false);
        return;
      }

      try {
        const {
          data: { status },
        } = await api.get(
          `${ROUTES.API.STUDENT}?get_type=classstatus&username=${user.username}&classSlug=${classSlug}`
        );
        if (status && status === true) {
          setCanView(true);
        }
      } catch (e: any) {
        console.log(
          "CanViewTopicError: " + e?.response?.data?.msg ?? e?.message
        );
      }
      setLoading(false);
    };
    checker();
  }, [loggedIn]);

  return {
    canView,
    loading,
  };
};

export default useCanViewTopic;
