const Btn = (props) => {
  return (
    <>
      <button
        disabled={props.disabled && true}
        className="text-primary ring-1 ring-primary shadow-md hover:ring-2 hover:shadow-none hover:bg-primary-100 px-5 py-2"
      >
        {props.title}
      </button>
    </>
  );
};
const Pagination = () => {
  return (
    <div className="flex gap-8 justify-center">
      <Btn title="Prev" />
      <Btn title="Next" />
    </div>
  );
};

export default Pagination;
