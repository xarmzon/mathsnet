import { NextSeo } from "next-seo";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserType } from "../../hooks/auth";
import { useState } from "react";
import Input from "../../components/controls/Input";
import QuillEditor from "../../components/general/QuillEditor";
import DataTable from "../../components/general/DataTable";
import { classesHeader } from "../../data/tables";

const data = [
  ["Adelola", "20-08-2021", "5,000", "5"],
  ["RastaXarm", "26-08-2021", "2,500", "2"],
];

const Classes = () => {
  useUserType();
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
        <DataTable header={classesHeader} data={data} />
      </div>
    </DashboardLayout>
  );
};
export default Classes;
