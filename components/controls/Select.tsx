import MessageBox from "../general/MessageBox";

export interface Options {}

export interface SelectOptionProps {
  text: string;
  value: string;
}

export interface SelectProps {
  name: string;
  value: string;
  required?: boolean;
  default?: SelectOptionProps;
  options: SelectOptionProps[];
  labelClass?: string;
  labelValue?: string;
  showLabel?: boolean;
  error?: string;
  multiple?: boolean;
  onChange: (value: string) => void;
}

const Select = (props: SelectProps) => {
  return (
    <div className="flex flex-col space-y-2">
      {props.showLabel && (
        <label
          htmlFor={props.name}
          className={`text-sm md:text-md ${props.labelClass} ${
            props.error && props.error.length > 0 && "text-red-600"
          }`}
        >
          {props.labelValue}
        </label>
      )}
      <select
        multiple={props.multiple || false}
        name={props.name}
        value={props.value}
        required={props.required ? true : false}
        className="bg-gray-200 border-none text-primary"
        onChange={(e) => props.onChange(e.target.value)}
      >
        <option value={props.default ? props.default.value : ""}>
          {props.default ? props.default.text : "Available options"}
        </option>
        {props.options.length > 0 &&
          props.options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.text}
            </option>
          ))}
      </select>
      <MessageBox
        msg={props.error && props.error.length > 0 && props.error}
        show={props.error && props.error.length > 0 ? true : false}
      />
    </div>
  );
};

export default Select;
