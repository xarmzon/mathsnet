import { useState, useRef, useEffect } from "react";
import { HiOutlineUserCircle, HiPencil } from "react-icons/hi";
import { FaFan } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ENTITY_NUMBERS, MAX_DP_SIZE, ROUTES } from "../../utils/constants";
import Image from "next/image";
import Input from "../controls/Input";
import Alert, { AlertRes, TypeAlert } from "../general/Alert";
import { componentsErrors, errorMessage } from "../../utils/errorHandler";
import api from "../../utils/fetcher";
import { saveToLocalStorage } from "../../utils";
import { addUser } from "../../redux/slice/auth";
export interface DataProfileViewProps {
  children: React.ReactNode;
}

export interface IUserInfoVal {
  value: string;
  error: string;
}
export interface IUserInfo {
  fullName: IUserInfoVal;
  email: IUserInfoVal;
  dpUrl: IUserInfoVal;
}
const sbmtTxt = "Update";
const DataProfileView = ({ children }: DataProfileViewProps) => {
  const msgRef = useRef<HTMLDivElement | undefined>();
  const uploadDisplayRef = useRef<HTMLInputElement | undefined>();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const [message, setMessage] = useState<{ msg: string; type: TypeAlert }>({
    msg: "",
    type: "info",
  });
  const [submitText, setSubmitText] = useState(sbmtTxt);

  const [editID, setEditID] = useState<string>("");
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<IUserInfo>({
    fullName: {
      error: "",
      value: "",
    },
    email: {
      error: "",
      value: "",
    },
    dpUrl: {
      error: "",
      value: "",
    },
  });
  const [resMsg, setResMsg] = useState<AlertRes>({
    type: "error",
    msg: "",
  });
  const [showUploadSpinner, setShowUploadSpinner] = useState<boolean>(false);

  const resetMessage = () => {
    handleResMsg();
    if (message.msg.length > 0)
      setMessage((prev) => ({ msg: "", type: "info" }));
  };

  const setFormDataError = (type, msg) => {
    setFormData((prev) => ({ ...prev, [type]: { ...prev[type], error: msg } }));
  };

  const handleResMsg = () => {
    if (resMsg.msg.length > 0) setResMsg((prev) => ({ ...prev, msg: "" }));
  };
  const handleChange = (e: any) => {
    resetMessage();
    const key = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [key]: { error: "", value },
    }));
  };

  const handleUploadDisplay = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_DP_SIZE * 1024) {
        setFormDataError(
          "dpUrl",
          `Invalid file size(max. of ${MAX_DP_SIZE}kb)`
        );
      } else {
        setFormDataError("dpUrl", "");
        const reader = new FileReader();
        reader.onloadstart = () => setShowUploadSpinner(true);
        reader.onload = () =>
          setFormData((prev) => ({
            ...prev,
            dpUrl: { error: "", value: reader.result as string },
          }));
        reader.onerror = () => {
          setShowUploadSpinner(false);
        };
        reader.onloadend = () => setShowUploadSpinner(false);

        reader.readAsDataURL(file);
      }
    }
  };
  const resetFormData = () => {
    Object.keys(formData).map((k) =>
      setFormData((prev) => ({
        ...prev,
        [k]: { error: "", value: user[k] },
      }))
    );
  };

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    resetMessage();
    switch (submitText) {
      case sbmtTxt:
        try {
          setSubmitText("Updating...");
          const formDataForward = Object.assign(
            {},
            ...Object.keys(formData).map((key) => {
              const val = formData[key]["value"];
              return {
                [key]: val,
              };
            })
          );
          formDataForward["username"] = user?.username;
          //console.log(formDataForward);
          const { data: updateRes } = await api.patch(
            ROUTES.API.USER,
            formDataForward
          );
          setResMsg((prev) => ({
            ...prev,
            type: "success",
            msg: updateRes.msg,
          }));
          //console.log(updateRes.user);
          msgRef?.current?.focus();
          saveToLocalStorage("user", updateRes.user);
          dispatch(addUser(updateRes.user));
          resetFormData();
          setShowEdit(false);
        } catch (e) {
          setResMsg((prev) => ({
            ...prev,
            type: "error",
            msg: errorMessage(e),
          }));
          msgRef?.current?.focus();
          const componentErr = componentsErrors(e);
          if (componentErr.length > 0) {
            componentErr.map((err) =>
              setFormData((prev) => ({
                ...prev,
                [err.type]: { ...prev[err.type], error: err.msg },
              }))
            );
          }
        } finally {
          setSubmitText(sbmtTxt);
        }
        break;
      default:
        return;
    }
  };
  return (
    <section className="w-full h-full flex flex-col md:flex-row gap-y-5 md:gap-x-3">
      <div className="w-full md:w-[65%] md:shadow-sm">{children}</div>
      <div className="w-full md:w-[35%] bg-purple-50 p-5 shadow-sm md:shadow-inner flex flex-col min-h-[200px] md:min-h-[300px]">
        <div className="flex w-full flex-col">
          {resMsg.msg.length > 0 && (
            <div ref={msgRef} tabIndex={-1} className="my-4">
              <Alert type={resMsg.type}>{resMsg.msg}</Alert>
            </div>
          )}
          {!loading && user && (
            <div className="flex flex-col w-full">
              <div className="relative flex justify-center">
                <div
                  onClick={() => {
                    showEdit &&
                      !showUploadSpinner &&
                      uploadDisplayRef?.current?.click();
                  }}
                  className="relative h-20 w-20 rounded-full overflow-hidden bg-gray-100 text-primary flex justify-center items-center shadow-inner object-cover text-center"
                >
                  {showUploadSpinner && (
                    <FaFan className="absolute text-lg animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                  <img
                    //layout="fill"
                    src={
                      formData.dpUrl.value
                        ? formData.dpUrl.value
                        : user.dpUrl
                        ? user.dpUrl
                        : "/assets/images/profile_avatar.png"
                    }
                    alt="Profile Picture"
                  />
                  {showEdit && (
                    <span
                      className={`cursor-pointer absolute left-0 right-0 -bottom-1 text-xs md:text-sm bg-gray-200 p-2 block ${
                        (formData.dpUrl || user?.dpUrl) &&
                        "bg-opacity-75 hover:bg-opacity-20"
                      }`}
                    >
                      Upload
                    </span>
                  )}
                </div>
                {!showEdit && (
                  <span
                    onClick={() => {
                      resetMessage();
                      resetFormData();
                      setShowEdit(true);
                    }}
                    className="absolute -right-1 top-10 bg-primary text-white h-8 w-8 lg:h-10 lg:w-10 rounded-full flex justify-center items-center text-sm lg:text-lg"
                  >
                    <HiPencil />
                  </span>
                )}
                <input
                  ref={uploadDisplayRef}
                  type="file"
                  name="displayImg"
                  id="displayImg"
                  className="hidden"
                  accept=".jpeg, .jpg, .png"
                  onChange={handleUploadDisplay}
                />
              </div>
              {!showEdit && (
                <div className="flex flex-col w-full">
                  {formData.dpUrl.error.length > 0 && (
                    <p className="text-center text-red-600 text-xs md:text-sm">
                      {formData.dpUrl.error}
                    </p>
                  )}
                  <div className="my-2 -space-y-1">
                    <p className="text-center text-lg font-bold text-gray-700">
                      {user.fullName}
                    </p>
                    <p className="text-center text-xs md:text-sm text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}
              {showEdit && (
                <form onSubmit={handleUpdateProfile}>
                  <div className="flex flex-col">
                    <Input
                      showLabel
                      labelValue="Full Name"
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName.value}
                      placeholder="E.g: Adelola Kayode Samson"
                      onChange={handleChange}
                      error={formData.fullName.error}
                    />
                  </div>

                  <div className="flex flex-col">
                    <Input
                      required
                      showLabel
                      labelValue="Email"
                      type="email"
                      name="email"
                      value={formData.email.value}
                      placeholder="Eg: samson@gmail.com"
                      onChange={handleChange}
                      error={formData.email.error}
                    />
                  </div>
                  <div className="text-center my-5">
                    <input
                      required
                      type="submit"
                      value={submitText}
                      className="inline-block px-5 py-2 transition-all duration-500 hover:bg-ascent-light hover:text-primary bg-primary text-primary-100 min-w-[50%]"
                    />
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DataProfileView;
