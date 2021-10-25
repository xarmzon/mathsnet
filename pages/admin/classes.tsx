import { NextSeo } from "next-seo";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserType } from "../../hooks/auth";
import { useState, useEffect, useRef } from "react";
import Input from "../../components/controls/Input";
import QuillEditor from "../../components/general/QuillEditor";
import DataTable from "../../components/general/DataTable";
import { classesHeader } from "../../data/tables";
import { PER_PAGE, MAX_IMG_SIZE, ROUTES } from "../../utils/constants";
import { TypeAlert } from "../../components/general/Alert";
import api from "../../utils/fetcher";
import Alert, { AlertRes } from "../../components/general/Alert";
import { componentsErrors, errorMessage } from "../../utils/errorHandler";
import useSWR, { useSWRConfig } from "swr";
import dateformat from "dateformat";

const data = [];

const Classes = () => {
  useUserType();
  const { mutate } = useSWRConfig();

  const uploadDisplayRef = useRef<HTMLInputElement | undefined>();
  const msgRef = useRef<HTMLDivElement | undefined>();

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
  const [submitText, setSubmitText] = useState("Add Class");
  const [uploadText, setUploadText] = useState<string>("Upload Display Image");
  const [formData, setFormData] = useState({
    title: {
      error: "",
      value: "",
    },
    shortDesc: {
      error: "",
      value: "",
    },
    desc: {
      error: "",
      value: "",
    },
    price: {
      error: "",
      value: "",
    },
    subMonths: {
      error: "",
      value: "",
    },
    displayImg: {
      error: "",
      value: "",
    },
  });

  const { data: classData, error: classDataError } = useSWR(
    `${ROUTES.API.CLASS}?search=${searchVal}&page=${page}`
  );

  //if (classData) console.log(classData);
  const resetMessage = () => {
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
    const data = classData?.results?.filter((v) => v._id === id)[0];
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

  const resetFormData = () => {
    Object.keys(formData).map((k) =>
      setFormData((prev) => ({
        ...prev,
        [k]: { error: "", value: "" },
      }))
    );
  };

  const handleDelete = async (id: string) => {
    resetMessage();
    // console.log(id);
    // console.log(Object.keys(formData));
    if (confirm("Are you sure?")) {
      try {
        setLoading((prev) => true);
        const { data: deleteRes } = await api.delete(
          `${ROUTES.API.CLASS}?id=${id}&delete_=${"one"}`
        );
        mutate(`${ROUTES.API.CLASS}?search=${searchVal}&page=${1}`);
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
  const handleChange = (e, type) => {
    setFormData((prev) => ({ ...prev, [type]: { ...prev[type], value: e } }));
  };
  const setFormDataError = (type, msg) => {
    setFormData((prev) => ({ ...prev, [type]: { ...prev[type], error: msg } }));
  };
  const handleForm = async (e: any) => {
    e.preventDefault();
    handleResMsg();
    switch (submitText) {
      case "Add Class":
        setSubmitText("Loading");
        try {
          const { data: addRes } = await api.post(ROUTES.API.CLASS, {
            title: formData.title.value,
            shortDesc: formData.shortDesc.value,
            desc: formData.desc.value,
            price: formData.price.value,
            subMonths: formData.subMonths.value,
            displayImg: formData.displayImg.value,
          });
          //console.log(addRes);
          setResMsg((prev) => ({
            ...prev,
            type: "success",
            msg: addRes.msg,
          }));
          resetFormData();
        } catch (e) {
          setResMsg((prev) => ({
            ...prev,
            type: "error",
            msg: errorMessage(e),
          }));
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
          setSubmitText("Add Class");
        }
        break;
      case "Update":
        setSubmitText("Updading...");
        try {
          const { data: updateRes } = await api.patch(ROUTES.API.CLASS, {
            title: formData.title.value,
            shortDesc: formData.shortDesc.value,
            desc: formData.desc.value,
            price: formData.price.value,
            subMonths: formData.subMonths.value,
            displayImg: formData.displayImg.value,
            id: editID,
          });
          setResMsg((prev) => ({
            ...prev,
            type: "success",
            msg: updateRes.msg,
          }));
          setSubmitText("Add Class");
          resetFormData();
        } catch (e) {
          setSubmitText("Update");
          setResMsg((prev) => ({
            ...prev,
            type: "error",
            msg: errorMessage(e),
          }));
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
        }
        break;
    }
    //console.log(formData);
    mutate(`${ROUTES.API.CLASS}?search=${searchVal}&page=${page}`);
  };

  const handleUploadDisplay = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_IMG_SIZE * 1024) {
        setFormDataError(
          "displayImg",
          `Invalid file size(max. of ${MAX_IMG_SIZE}kb)`
        );
      } else {
        setFormDataError("displayImg", ``);
        const reader = new FileReader();
        reader.onloadstart = () => setUploadText("Loading....");
        reader.onload = () =>
          setFormData((prev) => ({
            ...prev,
            displayImg: { error: "", value: reader.result as string },
          }));
        reader.onerror = () => setUploadText("Error loading image");
        reader.onloadend = () => setUploadText("Upload Display Image");

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <DashboardLayout>
      <NextSeo title="Classes" nofollow={true} noindex={true} />
      <h1 className="font-semibold text-md md:text-xl text-primary mb-9">
        Class Management
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
        <p className="text-gray-400 ">New Class</p>
        <Input
          showLabel
          labelValue="Class Title"
          value={formData.title.value}
          type="text"
          name="title"
          error={formData.title.error}
          minLength={3}
          maxLength={100}
          required
          placeholder="Class Title"
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <Input
          showLabel
          labelValue="Class Charges"
          value={formData.price.value}
          error={formData.price.error}
          type="number"
          name="price"
          min="0"
          required
          placeholder="Enter Charges"
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <Input
          showLabel
          labelValue="Subscription Month(s)"
          value={formData.subMonths.value}
          error={formData.subMonths.error}
          type="number"
          name="subMonths"
          min="0"
          required
          placeholder="Enter the Subscription Months"
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <Input
          showLabel
          labelValue="Short Description"
          value={formData.shortDesc.value}
          error={formData.shortDesc.error}
          type="text"
          name="shortDesc"
          minLength={8}
          required
          placeholder="Short Description"
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <QuillEditor
          value={formData.desc.value}
          onChange={(val: string) =>
            setFormData((prev) => ({
              ...prev,
              desc: { error: "", value: val },
            }))
          }
          placeholder="Long Description"
        />
        <div className="text-center">
          <input
            ref={uploadDisplayRef}
            type="file"
            name="displayImg"
            id="displayImg"
            className="hidden"
            accept=".jpeg, .jpg, .png"
            onChange={handleUploadDisplay}
          />
          <p
            className="cursor-pointer text-ascent"
            onClick={() => uploadDisplayRef?.current?.click()}
          >
            {uploadText}
          </p>
          {formData.displayImg.error.length > 0 && (
            <p className="text-red-600 text-xs md:text-sm">
              {formData.displayImg.error}
            </p>
          )}

          {formData.displayImg.value && (
            <div className="text-center flex justify-center mt-4 mb-3 object-cover h-[180px] w-[250px] mx-auto">
              <img
                src={formData.displayImg.value}
                alt="Display Image"
                className=""
              />
            </div>
          )}
        </div>
        <div className="text-center">
          <Input name="submit" type="submit" value={submitText} isBtn />
        </div>
      </form>
      <div className="mt-8 space-y-3 overflow-hidden">
        <p className="text-gray-400 ">Class List</p>
        <DataTable
          header={classesHeader}
          data={
            !classDataError && classData
              ? [
                  ...classData?.results?.map((d) => ({
                    id: d._id,
                    values: [
                      <p title={d.title}>
                        <a
                          className="underline line-clamp-4"
                          href={`${ROUTES.GENERAL.BASE}${d.slug}`}
                          target="_blank"
                        >
                          {d.title}
                        </a>
                      </p>,
                      <p title={`&#8358;${d.price}`}>&#8358;{d.price}</p>,
                      <p title={d.subMonths}>{d.subMonths}</p>,
                      <p title={`${dateformat(d.createdAt, "mediumDate")}`}>
                        {dateformat(d.createdAt, "mediumDate")}
                      </p>,
                    ],
                  })),
                ]
              : []
          }
          loading={
            !classDataError && !classData ? true : loading ? true : false
          }
          onDelete={(id) => handleDelete(id)}
          onEdit={(id) => handleEdit(id)}
          onSearch={(val: string) => handleSearch(val)}
          page={page}
          perPage={
            classData?.paging?.perPage ? classData?.paging?.perPage : PER_PAGE
          }
          totalPage={
            classData?.paging?.totalPages ? classData?.paging?.totalPages : 1
          }
          message={message}
          handlePagination={(page: number) => handlePagination(page)}
        />
      </div>
    </DashboardLayout>
  );
};
export default Classes;
