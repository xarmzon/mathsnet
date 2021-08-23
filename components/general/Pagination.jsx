import { useState } from "react";

const Btn = (props) => {
  return (
    <>
      <button
        onClick={props.onClick}
        name={props.title}
        disabled={props.disabled}
        className={`text-primary ring-1 ring-primary shadow-md hover:ring-2 hover:shadow-none hover:bg-primary-100 px-5 py-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:ring-gray-200 disabled:text-gray-400`}
      >
        {props.title}
      </button>
    </>
  );
};
const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = props.totalPage || 1;
  const handlePagination = (e) => {
    const type = e.target.name.toLowerCase();
    let page = currentPage;
    switch (type) {
      case "next":
        page = page === totalPage ? totalPage : page + 1;
        break;
      case "prev":
        page = page === 1 ? 1 : page - 1;
        break;
      default:
        return;
    }
    setCurrentPage((prev) => page);
    props.onClick(page, type);
  };
  return (
    <div className="flex gap-8 justify-center">
      <Btn
        title="Prev"
        disabled={currentPage == 1 && true}
        onClick={handlePagination}
      />
      <Btn
        title="Next"
        disabled={totalPage == currentPage && true}
        onClick={handlePagination}
      />
    </div>
  );
};

export default Pagination;
