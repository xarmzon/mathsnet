import { useRef, useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { connectDB } from "../../utils/database";
import { getClassData } from "../api/class";
import { formatPrice } from "../../utils";
import api from "../../utils/fetcher";
import { ROUTES, CONSTANTS, PAYMENT_STATUS } from "../../utils/constants";
import Footer from "../../components/general/Footer";
import Header from "../../components/general/Header";
import Loader from "../../components/general/Loader";
import LinkButton, { ETypes } from "../../components/general/LinkButton";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { NextSeo } from "next-seo";
import { FaAngleRight } from "react-icons/fa";
import { FiBookOpen, FiX, FiBook, FiMessageCircle } from "react-icons/fi";
import Link from "next/link";
import katex from "katex";
import dateformat from "dateformat";
import PaystackPayment from "../../components/general/PaystackPayment";
import { errorMessage } from "../../utils/errorHandler";
interface ITopics {
  id: string;
  title: string;
  slug: string;
}
interface IClassData {
  id: string;
  price: number;
  title: string;
  desc: string;
  slug: string;
  thumbnail: string;
  subMonths: number;
  createdAt: string;
  topics: ITopics[];
}
type MType = "success" | "error" | "info";
interface IMessage {
  text: string;
  type: MType;
}

const ClassViewPage = ({ classD }) => {
  const dispatch = useAppDispatch();

  const { user, loading, loggedIn } = useAppSelector((state) => state.auth);

  const [message, setMessage] = useState<IMessage>({
    text: "",
    type: "info",
  });
  const [addClassText, setAddClassText] = useState<string>("Add Class");
  const [showAddClass, setShowAddClass] = useState<boolean>(false);
  const [showPaymentButton, setShowPaymentButton] = useState<boolean>(false);
  const [loadingPaymentState, setLoadingPaymentState] =
    useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [showMobileTopicsNav, setShowMobileTopicsNav] =
    useState<boolean>(false);
  const [classData, setClassData] = useState<IClassData>(() => {
    if (classD && classD.length > 0) {
      const data = JSON.parse(classD);

      return {
        id: data._id,
        price: data.price,
        title: data.title,
        desc: data.desc,
        slug: data.slug,
        thumbnail: data.thumbnail,
        subMonths: data.subMonths,
        createdAt: data.createdAt,
        topics:
          data.topics && data.topics?.length > 0
            ? data.topics?.map((t) => ({
                id: t._id,
                title: t.title,
                slug: t.slug,
              }))
            : [],
      };
    } else {
      return {
        id: "",
        price: 0,
        title: "",
        desc: "",
        slug: "",
        thumbnail: "",
        subMonths: 0,
        createdAt: "",
        topics: [],
      };
    }
  });

  //classData && console.log(classData);
  useEffect(() => {
    if (katex) window.katex = katex;
  }, []);

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
                  console.log(status);
                  if (status === PAYMENT_STATUS.UNPAID) {
                    setShowPaymentButton(true);
                    setMessage({
                      text: "Last payment for this class was unsucessful",
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
  }, [loading, user]);

  useEffect(() => {
    if (message.text && message.text.length > 0) {
      setTimeout(() => setMessage({ text: "", type: "info" }), 15000);
    }
  }, [message.text, message]);

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
    <div>
      <NextSeo title={classData?.title || "Unknown Class"} />
      <div className="mb-2">
        <Header fixed={true} />
      </div>
      <div className="container pt-2">
        <div className="mt-[60px] -space-x-1 flex items-center flex-wrap">
          <span className="flex items-center">
            <LinkButton href="/" txt="Home" type={ETypes.TEXT} />
            <FaAngleRight className="text-sm md:text-lg text-gray-300" />
          </span>{" "}
          <span className="flex items-center">
            <LinkButton
              href={ROUTES.GENERAL.CLASSES}
              txt="Browse Classes"
              type={ETypes.TEXT}
            />
            <FaAngleRight className="text-sm md:text-lg text-gray-300" />
          </span>
          <span className="in-block pl-4 text-gray-400 text-sm md:text-lg">
            {classData?.title || "Unknown"}
          </span>
        </div>
        <div className="mt-3 p-5 w-full text-secondary">
          <div className="w-full">
            {classData ? (
              <div className="flex md:space-x-4 transition duration-700">
                <span
                  onClick={() => setShowMobileTopicsNav((prev) => !prev)}
                  className="cusor-pointer z-50 md:hidden fixed bottom-4 right-2 shadow-lg h-10 w-10 rounded-full bg-ascent-light text-primary flex items-center justify-center"
                >
                  {showMobileTopicsNav ? (
                    <FiX className="text-xl" />
                  ) : (
                    <FiBookOpen className="text-xl" />
                  )}
                </span>
                <div
                  className={`overflow-hidden z-40 md:z-auto ${
                    showMobileTopicsNav
                      ? "fixed top-[60px] left-0 bottom-0 w-[70%] shadow-md"
                      : "w-0"
                  } bg-gray-50 text-primary md:bg-gray-100 md:text-primary md:min-h-[200px] md:max-h-[200px] md:block md:w-[34%] transition duration-700`}
                >
                  <div className="space-y-3">
                    <h4 className="p-5 md:text-lg md:font-bold">
                      Class Topics{" "}
                    </h4>
                    <ul className="h-full overflow-y-auto divide-y divide-gray-300 md:divide-primary-200">
                      {classData.topics && classData.topics?.length > 0 ? (
                        classData.topics?.map((t, i) => (
                          <li
                            key={i}
                            className={`${
                              i > 0 && "pt-3"
                            } my-3 px-5 text-primary cursor-pointer line-clamp-2`}
                          >
                            <Link href={`/${classData.slug}/${t.slug}`}>
                              <a>{t.title}</a>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li className="px-5 italic text-red-600">No Topic</li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="w-full md:w-[65%]">
                  <img
                    className="w-full object-cover mt-2 rounded"
                    src={classData.thumbnail || "/assets/images/thumbnail.jpg"}
                  />
                  <p className="mt-1 text-xs md:text-sm text-gray-400">
                    Added on:{" "}
                    {classData.createdAt
                      ? dateformat(classData.createdAt, "fullDate")
                      : "Unknown"}
                  </p>
                  <h1 className="mt-2 mb-4 font-bold text-xl md:text-2xl">
                    {classData.title || "Unknown"}
                  </h1>
                  <div className="text-center w-full flex justify-center p-3">
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
                                onComplete={(msg: string) =>
                                  onCompletePayment(msg)
                                }
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
                          in order to add/access the class topics{" "}
                        </p>
                      )
                    )}
                  </div>
                  <div className="mt-4 w-full">
                    <div className="flex w-full overflow-x-auto space-x-5 md:space-x-7 min-h-[10px] border-b-2 border-gray-200">
                      <div
                        onClick={() => setCurrentTab(1)}
                        className={`${
                          currentTab === 1
                            ? "border-b border-primary text-primary"
                            : "border-0 text-secondary"
                        } flex items-center space-x-1 cursor-pointer`}
                      >
                        <FiBook />
                        <span className="">Description</span>
                      </div>
                      <div
                        onClick={() => setCurrentTab(2)}
                        className={`${
                          currentTab === 2
                            ? "border-b border-primary text-primary"
                            : "border-0 text-secondary"
                        } flex items-center space-x-1 cursor-pointer`}
                      >
                        <FiMessageCircle />
                        <span className="">Reviews</span>
                      </div>
                    </div>
                    <div className="pt-3 mb-3">
                      <div
                        className={`${
                          currentTab === 1 ? "block w-full" : "hidden"
                        }`}
                      >
                        {classData.desc ? (
                          <div
                            className="w-full"
                            dangerouslySetInnerHTML={{ __html: classData.desc }}
                          ></div>
                        ) : (
                          <p>No Description</p>
                        )}
                      </div>
                      <div
                        className={`${
                          currentTab === 2 ? "block w-full" : "hidden"
                        }`}
                      >
                        Reviews Tab
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="md:max-w-screen-md md:mx-auto p-5">
                <p className="text-red-600 text-2xl text-center">
                  {CONSTANTS.MESSAGES.COURSE_NOT_FOUND}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  await connectDB();
  const { class_slug: slug } = params;

  let classD: any;
  try {
    classD = await getClassData({ match: { slug } });
  } catch (e) {
    console.log(e);
    classD = "";
  }
  //console.log(classD);
  return {
    props: {
      classD: JSON.stringify(classD || "", null, 4),
    },
  };
};

export default ClassViewPage;
