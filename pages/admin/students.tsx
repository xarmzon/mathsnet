import { useState, useRef, useEffect } from "react";
import { NextSeo } from "next-seo";
import Input from "../../components/controls/Input";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserType } from "../../hooks/auth";
import { ENTITY_NUMBERS, PER_PAGE, ROUTES } from "../../utils/constants";
import Alert, { AlertRes, TypeAlert } from "../../components/general/Alert";
import { validateRegForm } from "../../utils/auth";
import { componentsErrors, errorMessage } from "../../utils/errorHandler";
import useSWR, { useSWRConfig } from "swr";
import api from "../../utils/fetcher";
import DataTable from "../../components/general/DataTable";
import dateformat from "dateformat";
import { instructorListHeader } from "../../data/tables";
import { IRegFormData } from "./instructors";

const sbmtTxt = "Add Student";
const Students = () => {
  useUserType();

  const { mutate } = useSWRConfig();
  const msgRef = useRef<HTMLDivElement | undefined>();

  const [formData, setFormData] = useState<IRegFormData>({
    fullName: {
      value: "",
      error: "",
    },
    username: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
    cPassword: {
      value: "",
      error: "",
    },
  });
  const [searchVal, setSearchVal] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ msg: string; type: TypeAlert }>({
    msg: "",
    type: "info",
  });
  const [resMsg, setResMsg] = useState<AlertRes>({
    type: "error",
    msg: "",
  });
  const [editID, setEditID] = useState<string>("");
  const [submitText, setSubmitText] = useState(sbmtTxt);

  const { data: studentsData, error: studentsDataError } = useSWR(
    `${ROUTES.API.STUDENT}?get_type=student&search=${searchVal}&page=${page}`
  );

  //if (studentsData) console.log(studentsData);
  const resetMessage = () => {
    handleResMsg();
    if (message.msg.length > 0)
      setMessage((prev) => ({ msg: "", type: "info" }));
  };

  const handleSearch = async (val: string) => {
    resetMessage();
    setSearchVal(val);
  };

  const handleEdit = (id: string) => {
    resetMessage();
    //console.log(id);
    const data = studentsData?.results?.filter((v) => v._id === id)[0];
    //console.log(data);
    if (data) {
      setEditID((prev) => data._id);
      Object.keys(formData).map((k) =>
        setFormData((prev) => ({
          ...prev,
          [k]: { error: "", value: data[k] },
        }))
      );
      setSubmitText((prev) => "Update");
    }
  };
  const handleDelete = async (id: string) => {
    resetMessage();
    //console.log(id);
    if (confirm("Are you sure?")) {
      try {
        setLoading((prev) => true);
        const { data: deleteRes } = await api.delete(
          `${ROUTES.API.STUDENT}?id=${id}&delete_type=${"student"}`
        );
        mutate(
          `${ROUTES.API.STUDENT}?get_type=student&search=${searchVal}&page=${1}`
        );
        setMessage((prev) => ({ msg: deleteRes.msg, type: "success" }));
      } catch (error) {
        setMessage((prev) => ({ msg: errorMessage(error), type: "error" }));
      } finally {
        setLoading((prev) => false);
      }
    }
  };

  const handlePagination = (page: number) => {
    resetMessage();
    setPage((prev) => page);
  };
  const handleResMsg = () => {
    if (resMsg.msg.length > 0) setResMsg((prev) => ({ ...prev, msg: "" }));
  };

  const setFormDataError = (type: string, msg: string) => {
    setFormData((prev) => ({ ...prev, [type]: { ...prev[type], error: msg } }));
  };
  const resetFormData = () => {
    Object.keys(formData).map((k) =>
      setFormData((prev) => ({
        ...prev,
        [k]: { error: "", value: "" },
      }))
    );
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
  const handleForm = async (e: any) => {
    e.preventDefault();
    resetMessage();
    const errors = await validateRegForm(formData, true);
    if (errors.length > 0) {
      errors.map((err) => {
        setFormData((prev) => ({
          ...prev,
          [err.name]: { ...prev[err.name], error: err.msg },
        }));
      });
    } else {
      setSubmitText("Loading...");
      try {
        const formDataForward = Object.assign(
          {},
          ...Object.keys(formData).map((key) => {
            const val = formData[key]["value"];
            return {
              [key]: val,
            };
          })
        );
        formDataForward["post_type"] = "student";
        //console.log(formDataForward);
        const { data: addRes } = await api.post(
          ROUTES.API.STUDENT,
          formDataForward
        );
        setResMsg((prev) => ({
          ...prev,
          type: "success",
          msg: addRes.msg,
        }));
        msgRef?.current?.focus();
        resetFormData();
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
        mutate(
          `${ROUTES.API.STUDENT}?get_type=instructor&search=${searchVal}&page=${page}`
        );
      }
    }
  };
  return (
    <DashboardLayout>
      <NextSeo title="Students" nofollow={true} noindex={true} />
      <h1 className="font-semibold text-md md:text-xl text-primary mb-9">
        Students Management
      </h1>
      {resMsg.msg.length > 0 && (
        <div ref={msgRef} tabIndex={-1} className="my-4">
          <Alert type={resMsg.type}>{resMsg.msg}</Alert>
        </div>
      )}
      <form
        onSubmit={handleForm}
        className="space-y-4 flex flex-col w-100 max-w-md md:mx-auto"
      >
        <p className="text-gray-400 ">New Student</p>
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
            showLabel
            labelValue="Username"
            required
            type="text"
            name="username"
            maxLength={ENTITY_NUMBERS.USERNAME_MAX}
            minLength={ENTITY_NUMBERS.USERNAME_MIN}
            value={formData.username.value}
            placeholder="Eg: samson"
            onChange={handleChange}
            error={formData.username.error}
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
        <div className="flex flex-col">
          <Input
            required
            showLabel
            labelValue="Password"
            maxLength={ENTITY_NUMBERS.PASSWORD_MAX}
            minLength={ENTITY_NUMBERS.PASSWORD_MIN}
            type="password"
            name="password"
            value={formData.password.value}
            placeholder="Enter your Password"
            onChange={handleChange}
            error={formData.password.error}
          />
        </div>
        <div className="flex flex-col">
          <Input
            required
            showLabel
            labelValue="Confirm Password"
            maxLength={ENTITY_NUMBERS.PASSWORD_MAX}
            minLength={ENTITY_NUMBERS.PASSWORD_MIN}
            type="password"
            name="cPassword"
            value={formData.cPassword.value}
            placeholder="Confirm your Password"
            onChange={handleChange}
            error={formData.cPassword.error}
          />
        </div>
        <div className="text-center mb-5">
          <input
            required
            type="submit"
            value={submitText}
            className="inline-block px-5 py-2 transition-all duration-500 hover:bg-ascent-light hover:text-primary bg-primary text-primary-100 min-w-[50%]"
          />
        </div>
      </form>
      <div className="mt-8 space-y-3 overflow-hidden">
        <p className="text-gray-400 ">Students List</p>
        <DataTable
          header={instructorListHeader}
          showEdit={false}
          data={
            !studentsDataError && studentsData
              ? [
                  ...studentsData?.results?.map((d) => ({
                    id: d._id,
                    values: [
                      <p key={d.fullName} title={d.fullName}>
                        {d.fullName}
                      </p>,
                      <p key={d.username} title={d.username}>
                        {d.username}
                      </p>,
                      <p key={d.email} title={d.email}>
                        {d.email}
                      </p>,
                      <p
                        key={d.createdAt}
                        title={`${dateformat(d.createdAt, "mediumDate")}`}
                      >
                        {dateformat(d.createdAt, "mediumDate")}
                      </p>,
                    ],
                  })),
                ]
              : []
          }
          loading={
            !studentsDataError && !studentsData ? true : loading ? true : false
          }
          onDelete={(id) => handleDelete(id)}
          onEdit={(id) => handleEdit(id)}
          onSearch={(val: string) => handleSearch(val)}
          page={page}
          perPage={
            studentsData?.paging?.perPage
              ? studentsData?.paging?.perPage
              : PER_PAGE
          }
          totalPage={
            studentsData?.paging?.totalPages
              ? studentsData?.paging?.totalPages
              : 1
          }
          message={message}
          handlePagination={(page: number) => handlePagination(page)}
        />
      </div>
    </DashboardLayout>
  );
};
export default Students;
