import { useState, useEffect, useRef } from "react";
import Alert, { TypeAlert } from "./Alert";
import Pagination from "./Pagination";

export interface IValue {
  value: string;
}
export interface IHeader extends IValue {}

export interface IData {
  values: IValue[];
  id?: string;
}

export interface DataTableProps {
  header: IHeader[];
  data: IData[];
  loading: boolean;
  onSearch(val: string): void;
  onEdit(id: string): void;
  onDelete(id: string): void;
  totalPage: number;
  page: number;
  perPage: number;
  handlePagination(page: number): void;
  message: {
    msg: string;
    type: TypeAlert;
  };
  showEdit?: boolean;
  showDelete?: boolean;
}

const DataTable = ({
  header,
  data,
  loading,
  onSearch,
  onEdit,
  onDelete,
  totalPage = 1,
  handlePagination,
  page,
  message,
  perPage,
  showDelete = true,
  showEdit = true,
}: DataTableProps) => {
  const [searchVal, setSearchVal] = useState<string>("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchVal);
  };

  const handleAction = (type: string, id: string) => {
    switch (type) {
      case "edit":
        onEdit(id);
        break;

      case "delete":
        onDelete(id);
        break;

      default:
        return;
    }
  };

  return (
    <div className="w-full">
      {message.msg.length > 0 && (
        <div className="my-3 flex justify-center">
          <Alert type={message.type}>{message.msg}</Alert>
        </div>
      )}
      <form onSubmit={handleSearch} className="w-full my-4">
        <input
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search..."
          type="search"
          className="w-full border-0 focus:border-0 focus:ring-0 focus:shadow-md bg-gray-50 rounded"
        />
      </form>
      <div className="w-full overflow-x-scroll h-[400px] md:h-[550px] px-3">
        <table className="datatable w-full px-3">
          {!loading && data.length === 0 && (
            <tbody>
              <tr className="mt-12 font-bold text-lg text-center flex justify-center items-center text-secondary">
                <td>No Data To Display</td>
              </tr>
            </tbody>
          )}
          {loading && (
            <tbody>
              <tr className="mt-12 font-bold text-lg text-center flex justify-center items-center text-secondary">
                <td>Loading Data..............</td>
              </tr>
            </tbody>
          )}
          {!loading && data.length > 0 && (
            <>
              <thead className="text-primary px-4">
                <tr>
                  <th className="px-2">#</th>
                  {header.map((h, i) => (
                    <th
                      className={`${
                        i === 0 ? "w-2/4 md:w-[25%]" : ""
                      } px-5 py-2`}
                      key={h.value}
                    >
                      {h.value}
                    </th>
                  ))}
                  {(showDelete || showEdit) && <th>Actions</th>}
                </tr>
              </thead>
              <tbody className="text-secondary px-4">
                {!loading &&
                  data.length > 0 &&
                  data.map((d, i1) => (
                    <tr key={i1} className="border-b-2 border-gray-200 px-4">
                      <td className={`p-5 py-3`}>
                        {perPage * page - (perPage - (i1 + 1))}
                      </td>
                      {d.values.map((d2, i2) => (
                        <td
                          className={`${
                            i2 === 0 ? "text-left" : "text-center"
                          } px-5 py-3`}
                          key={i2}
                        >
                          {d2}
                        </td>
                      ))}
                      <td className="flex flex-col justify-center space-y-3 mt-2">
                        {showEdit && (
                          <button
                            className="text-primary border-0 px-2 py-1 uppercase shadow-md"
                            onClick={() => handleAction("edit", d.id)}
                          >
                            Update
                          </button>
                        )}
                        {showDelete && (
                          <button
                            className="text-red-600 border-0  px-3 py-1 uppercase shadow-md"
                            onClick={() => handleAction("delete", d.id)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
        </table>
      </div>
      <div className="w-full flex justify-between items-center pr-1 py-3">
        <p className="text-xs sm:text-sm md:text-lg">
          {!loading && data.length > 0 && (
            <>
              Page {page} of {totalPage} {totalPage > 1 ? "Pages" : "Page"}
            </>
          )}
        </p>
        <Pagination
          totalPage={totalPage}
          onClick={(page) => handlePagination(page)}
          small
        />
      </div>
    </div>
  );
};

export default DataTable;
