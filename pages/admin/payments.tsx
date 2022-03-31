import { useState, useRef, useEffect } from "react";
import { NextSeo } from "next-seo";
import Input from "../../components/controls/Input";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserType } from "../../hooks/auth";
import { ENTITY_NUMBERS, PER_PAGE, ROUTES } from "../../utils/constants";
import Alert, { AlertRes, TypeAlert } from "../../components/general/Alert";
import { componentsErrors, errorMessage } from "../../utils/errorHandler";
import useSWR, { useSWRConfig } from "swr";
import api from "../../utils/fetcher";
import DataTable from "../../components/general/DataTable";
import dateformat from "dateformat";
import { instructorListHeader } from "../../data/tables";

const sbmtTxt = "Add Payment";
const Payments = () => {
  useUserType();

  const { mutate } = useSWRConfig();
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
  const [submitText, setSubmitText] = useState(sbmtTxt);

  const [formData, setFormData] = useState({});

  const { data: paymentsData, error: paymentsDataError } = useSWR(
    `${ROUTES.API.STUDENT}?get_type=student&search=${searchVal}&page=${page}`
  );

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
    const data = paymentsData?.results?.filter((v) => v._id === id)[0];
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
    //TODO: CHANGE TO PAYMENT API
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
  return (
    <DashboardLayout>
      <NextSeo title="Payments" nofollow={true} noindex={true} />
      <h1 className="font-semibold text-md md:text-xl text-primary mb-9">
        Payments
      </h1>
      {resMsg.msg.length > 0 && (
        <div ref={msgRef} tabIndex={-1} className="my-4">
          <Alert type={resMsg.type}>{resMsg.msg}</Alert>
        </div>
      )}
      <div className="mt-8 space-y-3 overflow-hidden">
        <p className="text-gray-400 ">Payments List</p>
        <DataTable
          header={instructorListHeader}
          showEdit={false}
          data={
            !paymentsDataError && paymentsData
              ? [
                  ...paymentsData?.results?.map((d) => ({
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
            !paymentsDataError && !paymentsData ? true : loading ? true : false
          }
          onDelete={(id) => handleDelete(id)}
          onEdit={(id) => handleEdit(id)}
          onSearch={(val: string) => handleSearch(val)}
          page={page}
          perPage={
            paymentsData?.paging?.perPage
              ? paymentsData?.paging?.perPage
              : PER_PAGE
          }
          totalPage={
            paymentsData?.paging?.totalPages
              ? paymentsData?.paging?.totalPages
              : 1
          }
          message={message}
          handlePagination={(page: number) => handlePagination(page)}
        />
      </div>
    </DashboardLayout>
  );
};
export default Payments;
