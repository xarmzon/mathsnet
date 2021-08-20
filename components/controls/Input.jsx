const Input = (props) => {
  return (
    <>
      {props.showLabel && (
        <label
          htmlFor={props.name}
          className={`text-sm md:text-md ${props.labelClass} ${
            props.error && "text-red-600"
          }`}
        >
          {props.labelValue}
        </label>
      )}
      <input
        type={props.type || "text"}
        className={`${
          props.error
            ? "border-red-600 focus:ring-red-600"
            : "border-gray-200 focus:ring-primary"
        } ${
          props.isBtn
            ? "cursor-pointer inline-block px-5 py-2 text-primary-100 bg-primary"
            : "bg-gray-100 text-primary text-opacity-80"
        } rounded-sm focus:border-none focus:outline-none focus:shadow-lg focus:ring-1 ${
          props.inputClass && props.inputClass
        } `}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e)}
        required={props.required || false}
        maxLength={props.maxLength || undefined}
        minLength={props.minLength || undefined}
      />
    </>
  );
};

export default Input;
