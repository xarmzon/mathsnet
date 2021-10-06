import { useState } from "react";

export interface BtnProps {
  onClick: (e: any) => void;
  title: string;
  disabled: boolean;
  small: boolean;
}

const Btn = (props: BtnProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        name={props.title}
        disabled={props.disabled}
        className={`text-primary ring-1 ring-primary shadow-md hover:ring-2 hover:shadow-none hover:bg-primary-100 px-5 py-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:ring-gray-200 disabled:text-gray-400 ${
          props.small && "text-sm px-4 py-1"
        }`}
      >
        {props.title}
      </button>
    </>
  );
};

export interface PaginationProps {
  onClick: (page: number, type: string) => void;
  small?: boolean;
  totalPage?: number;
}

const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = props.totalPage || 1;
  const handlePagination = (e: any) => {
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
    <div className={`flex ${props.small ? "gap-4" : "gap-8"} justify-center`}>
      <Btn
        title="Prev"
        disabled={currentPage == 1 && true}
        onClick={handlePagination}
        small={props.small && props.small}
      />
      <Btn
        title="Next"
        disabled={totalPage == currentPage && true}
        onClick={handlePagination}
        small={props.small && props.small}
      />
    </div>
  );
};

export default Pagination;
