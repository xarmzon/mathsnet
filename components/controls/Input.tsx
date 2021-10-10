import { ChangeEvent } from "react";
import MessageBox from "../general/MessageBox";
// enum InputTypes {
//   text:
// }
export interface InputProps {
  showLabel?: boolean;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  labelValue?: string;
  labelClass?: string;
  isBtn?: boolean;
  type?: string;
  inputClass?: string;
  required?: boolean;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  min?: string;
  max?: string;
  rightIcon?: any;
  leftIcon?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  return (
    <div className="space-y-1 flex flex-col">
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
      <input
        type={props.type || "text"}
        className={`${
          props.error && props.error.length > 0
            ? "border-red-600 focus:ring-red-600"
            : "border-gray-200 focus:ring-primary"
        } ${
          props.isBtn
            ? "cursor-pointer inline-block px-3 py-2 text-white bg-primary w-[65%] mx-auto text-center my-2"
            : "px-3 py-2 bg-gray-200 text-primary text-opacity-80"
        } rounded-sm focus:border-none focus:outline-none focus:shadow-lg focus:ring-1 ${
          props.inputClass && props.inputClass
        } w-full`}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e)}
        required={props.required || false}
        maxLength={props.maxLength || undefined}
        minLength={props.minLength || undefined}
        max={props.max || undefined}
        min={props.min || undefined}
      />
      <MessageBox
        msg={props.error || ""}
        type="error"
        show={props.error && props.error.length > 0}
      />
    </div>
  );
};

export default Input;
