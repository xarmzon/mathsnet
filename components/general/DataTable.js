import Pagination from "./Pagination";

const DataTable = ({ header, data }) => {
  return (
    <div className="w-full">
      <div>Search</div>
      <div className="w-full overflow-x-scroll">
        <table className="datatable w-full">
          <thead>
            <tr>
              <th className="px-2">#</th>
              {header.map((h, i) => (
                <th
                  className={`${i === 0 ? "w-2/4" : ""} px-5 py-2`}
                  key={h.value}
                >
                  {h.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d, i1) => (
              <tr key={i1}>
                <td className={`p-5 py-3`}>{i1 + 1}</td>
                {d.map((d2, i2) => (
                  <td
                    className={`${
                      i2 === 0 ? "text-left" : "text-center"
                    } px-5 py-3`}
                    key={i2}
                  >
                    {d2}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end pr-1 py-3">
        <Pagination totalPage="7" onClick={(page) => console.log(page)} small />
      </div>
    </div>
  );
};

export default DataTable;
