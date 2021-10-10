import { NextSeo } from "next-seo";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserType } from "../../hooks/auth";
import { useState } from "react";
import Input from "../../components/controls/Input";
import QuillEditor from "../../components/general/QuillEditor";
import DataTable from "../../components/general/DataTable";
import { classesHeader } from "../../data/tables";
import { PER_PAGE } from "../../utils/constants";
const data = [];

const Classes = () => {
  useUserType();
  const [searchVal, setSearchVal] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ msg: string; type: TypeAlert }>({
    msg: "",
    type: "info",
  });
  const [editID, setEditID] = useState<string>("");
  const [submitText, setSubmitText] = useState("Add Class");
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
  });

  const resetMessage = () => {
    if (message.msg.length > 0)
      setMessage((prev) => ({ msg: "", type: "info" }));
  };

  const handleSearch = async (val: string) => {
    resetMessage();
    setSearchVal(val);
    //setPage(prev=>1);
  };

  const handleEdit = (id: string) => {
    resetMessage();
    console.log(id);
    // const data = studentsData?.results?.filter((v) => v._id === id)[0];
    // //console.log(data)
    // if (data) {
    //   setEditID((prev) => data._id);
    //   setFormData((prev) => ({
    //     fullName: data.fullName,
    //     phoneNumber: data.phoneNumber,
    //     email: data.email,
    //     faculty: data.faculty,
    //     department: data.department,
    //     jamb: data.jamb,
    //     courseSelections: data.courseSelections,
    //   }));
    //   setSubmitText((prev) => "Update");
    // }
  };

  const handleDelete = async (id: string) => {
    resetMessage();
    if (confirm("Are you sure?")) {
      // try {
      //   setLoading((prev) => true);
      //   const { data } = await api.delete(
      //     `${ROUTES.API.STUDENT}?id=${id}&delete_=${"one"}`
      //   );
      //   mutate(`${ROUTES.API.STUDENT}?search=${searchVal}&page=${0}`);
      //   setMessage((prev) => ({ msg: data.msg, type: "success" }));
      // } catch (error) {
      //   setMessage((prev) => ({ msg: errorMessage(error), type: "error" }));
      // } finally {
      //   setLoading((prev) => false);
      // }
    }
  };

  const handlePagination = (page: number) => {
    resetMessage();
    setPage((prev) => page);
  };

  const handleChange = (e, type) => {
    setFormData((prev) => ({ ...prev, [type]: { ...prev[type], value: e } }));
  };
  const handleForm = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <DashboardLayout>
      <NextSeo title="Classes" nofollow={true} noindex={true} />
      <h1 className="font-semibold text-md md:text-xl text-primary mb-9">
        Class Management
      </h1>
      <form
        onSubmit={handleForm}
        className="space-y-4 flex flex-col w-100 max-w-md md:mx-auto"
      >
        <p className="text-gray-400 ">New Class</p>
        <Input
          value={formData.title.value}
          type="text"
          name="title"
          minLength="5"
          maxLength="30"
          required
          placeholder="Class Title"
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <Input
          value={formData.price.value}
          type="number"
          name="price"
          min="0"
          required
          placeholder="Class Charges"
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <Input
          value={formData.price.value}
          type="number"
          name="subMonths"
          min="0"
          required
          placeholder="Subscription Months"
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <Input
          value={formData.shortDesc.value}
          type="text"
          name="shortDesc"
          minLenth="8"
          required
          placeholder="Short Description"
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <QuillEditor
          value={formData.desc.value}
          onChange={handleChange}
          placeholder="Long Description"
        />
        <div className="text-center">
          <Input type="submit" value={submitText} isBtn />
        </div>
      </form>
      <div className="mt-8 space-y-3 overflow-hidden">
        <p className="text-gray-400 ">Class List</p>
        <DataTable
          header={classesHeader}
          data={data}
          loading={false}
          onDelete={(id) => handleDelete(id)}
          onEdit={(id) => handleEdit(id)}
          onSearch={(val: string) => handleSearch(val)}
          page={page}
          perPage={PER_PAGE}
          totalPage={1}
          message={message}
          handlePagination={(page: number) => handlePagination(page)}
        />
      </div>
    </DashboardLayout>
  );
};
export default Classes;
