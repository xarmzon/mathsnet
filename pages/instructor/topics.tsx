import { NextSeo } from "next-seo";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserType } from "../../hooks/auth";
import { useState, useEffect, useRef } from "react";
import Input from "../../components/controls/Input";
import QuillEditor from "../../components/general/QuillEditor";
import DataTable from "../../components/general/DataTable";
import { topicsHeader } from "../../data/tables";
import {
  PER_PAGE,
  MAX_IMG_SIZE,
  ROUTES,
  CONSTANTS,
} from "../../utils/constants";
import { TypeAlert } from "../../components/general/Alert";
import api from "../../utils/fetcher";
import Alert, { AlertRes } from "../../components/general/Alert";
import { componentsErrors, errorMessage } from "../../utils/errorHandler";
import useSWR, { useSWRConfig } from "swr";
import dateformat from "dateformat";
import Select, { SelectOptionProps } from "../../components/controls/Select";
import { GetServerSideProps } from "next";
import Class from "../../models/ClassModel";
import { connectDB } from "../../utils/database";

const data = [];

export interface IFormValue {
  value: string;
  error: string;
}

export interface IFormData {
  title: IFormValue;
  description: IFormValue;
  videoLink: IFormValue;
  tClass: IFormValue;
  thumbnail: IFormValue;
}

interface TopicsProps {
  classList: string;
  children?: React.ReactNode;
}
const Topics = ({ classList }: TopicsProps) => {
  useUserType(CONSTANTS.USER_TYPES.INSTRUCTOR);
  const { mutate } = useSWRConfig();

  const uploadDisplayRef = useRef<HTMLInputElement | undefined>();
  const msgRef = useRef<HTMLDivElement | undefined>();

  const [classListData, setClassListData] = useState<SelectOptionProps[]>(() =>
    classList && classList.length > 0 ? JSON.parse(classList) : []
  );
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
  const [submitText, setSubmitText] = useState("Add Topic");
  const [uploadText, setUploadText] = useState<string>("Upload Display Image");
  const [formData, setFormData] = useState<IFormData>({
    title: {
      error: "",
      value: "",
    },
    description: {
      error: "",
      value: "",
    },
    videoLink: {
      error: "",
      value: "",
    },
    tClass: {
      error: "",
      value: "",
    },
    thumbnail: {
      error: "",
      value: "",
    },
  });

  const { data: topicsData, error: topicsDataError } = useSWR(
    `${ROUTES.API.INSTRUCTOR}?search=${searchVal}&page=${page}`
  );

  // if (topicsData) console.log(topicsData);
  // if (topicsDataError) console.log(topicsDataError);

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
    const data = topicsData?.results?.filter((v) => v._id === id)[0];
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
          `${ROUTES.API.INSTRUCTOR}?id=${id}&delete_type=topic`
        );
        mutate(`${ROUTES.API.INSTRUCTOR}?search=${searchVal}`);
        setMessage((prev) => ({ msg: deleteRes.msg, type: "success" }));
      } catch (error) {
        setMessage((prev) => ({ msg: errorMessage(error), type: "error" }));
      } finally {
        setLoading((prev) => false);
      }
    }
  };

  const formatFormData = () => {
    const formattedFormData = Object.assign(
      {},
      ...Object.entries(formData).map((d) => {
        const key = d[0];
        const val = d[1]["value"];
        return { [key]: val };
      })
    );

    return formattedFormData;
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
      case "Add Topic":
        setSubmitText("Loading");
        try {
          const dataToSend = formatFormData();
          dataToSend["post_type"] = "topic";
          //console.log(dataToSend);
          const { data: addRes } = await api.post(
            ROUTES.API.INSTRUCTOR,
            dataToSend
          );
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
          setSubmitText("Add Topic");
        }
        break;
      case "Update":
        setSubmitText("Updading...");
        try {
          const dataToEdit = formatFormData();
          dataToEdit["patch_type"] = "topic";
          const { data: updateRes } = await api.patch(ROUTES.API.INSTRUCTOR, {
            ...dataToEdit,
            id: editID,
          });
          setResMsg((prev) => ({
            ...prev,
            type: "success",
            msg: updateRes.msg,
          }));
          setSubmitText("Add Topic");
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
    msgRef?.current?.focus();
    mutate(`${ROUTES.API.INSTRUCTOR}?search=${searchVal}&page=${page}`);
  };

  const handleUploadDisplay = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_IMG_SIZE * 1024) {
        setFormDataError(
          "thumbnail",
          `Invalid file size(max. of ${MAX_IMG_SIZE}kb)`
        );
      } else {
        setFormDataError("thumbnail", ``);
        const reader = new FileReader();
        reader.onloadstart = () => setUploadText("Loading....");
        reader.onload = () =>
          setFormData((prev) => ({
            ...prev,
            thumbnail: { error: "", value: reader.result as string },
          }));
        reader.onerror = () => setUploadText("Error loading image");
        reader.onloadend = () => setUploadText("Upload Display Image");

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <DashboardLayout>
      <NextSeo title="Topics" nofollow={true} noindex={true} />
      <h1 className="font-semibold text-md md:text-xl text-primary mb-9">
        Topics Management
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
        <p className="text-gray-400 ">New Topic</p>
        <Input
          showLabel
          labelValue="Topic Title"
          value={formData.title.value}
          type="text"
          name="title"
          error={formData.title.error}
          minLength={5}
          required
          placeholder="Topic Title"
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <Select
          showLabel
          labelValue="Topic Class"
          options={classListData}
          error={formData.tClass.error}
          name="tClass"
          required
          default={{ value: "", text: "Pick a class for the topic" }}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              tClass: { value: val, error: "" },
            }))
          }
        />
        <Input
          showLabel
          labelValue="Video Link"
          value={formData.videoLink.value}
          error={formData.videoLink.error}
          type="url"
          name="videoLink"
          required
          placeholder="Enter the Video Link"
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <QuillEditor
          value={formData.description.value}
          onChange={(val: string) =>
            setFormData((prev) => ({
              ...prev,
              description: { error: "", value: val },
            }))
          }
          placeholder="Description for the topic"
        />
        <div className="text-center">
          <input
            ref={uploadDisplayRef}
            type="file"
            name="thumbnail"
            id="thumbnail"
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
          {formData.thumbnail.error.length > 0 && (
            <p className="text-red-600 text-xs md:text-sm">
              {formData.thumbnail.error}
            </p>
          )}

          {formData.thumbnail.value && (
            <div className="text-center flex justify-center mt-4 mb-3 object-cover h-[180px] w-[250px] mx-auto">
              <img
                src={formData.thumbnail.value}
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
        <p className="text-gray-400 ">Topic List</p>
        <DataTable
          header={topicsHeader}
          data={
            !topicsDataError && topicsData
              ? [
                  ...topicsData?.results?.map((d) => ({
                    id: d._id,
                    values: [
                      <p title={d.title}>
                        <a
                          className="underline"
                          href={`${ROUTES.GENERAL.LEARN}/${d.tClass.slug}/${d.slug}`}
                          target="_blank"
                        >
                          {d.title}
                        </a>
                      </p>,
                      <p title={d.tClass.title}>
                        <a
                          className="underline"
                          href={`${ROUTES.GENERAL.LEARN}/${d.tClass.slug}`}
                          target="_blank"
                        >
                          {d.tClass.title}
                        </a>
                      </p>,
                      <p title={`${dateformat(d.createdAt, "mediumDate")}`}>
                        {dateformat(d.createdAt, "mediumDate")}
                      </p>,
                    ],
                  })),
                ]
              : []
          }
          loading={
            !topicsDataError && !topicsData ? true : loading ? true : false
          }
          onDelete={(id) => handleDelete(id)}
          onEdit={(id) => handleEdit(id)}
          onSearch={(val: string) => handleSearch(val)}
          page={page}
          perPage={
            topicsData?.paging?.perPage ? topicsData?.paging?.perPage : PER_PAGE
          }
          totalPage={
            topicsData?.paging?.totalPages ? topicsData?.paging?.totalPages : 1
          }
          message={message}
          handlePagination={(page: number) => handlePagination(page)}
        />
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  const classList = await Class.find({}).select("id title");

  const data =
    classList.length > 0
      ? classList.map((d) => ({ value: d._id, text: d.title }))
      : [];

  return {
    props: {
      classList: JSON.stringify(data),
    },
  };
};

export default Topics;
