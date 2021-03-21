import React, { Fragment } from "react";
import { PropTypes } from "prop-types";
import { Check } from "./Icons";

function Input({ type, id, placeholder }) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={
        type === "checkbox"
          ? "appearance-none cursor-pointer outline-none w-5 h-5 bg-no-repeat bg-checkbox-unchecked checked:bg-checkbox-checked rounded-lg"
          : "outline-none text-lg rounded-xl px-4 py-2 focus:bg-gray-100 placeholder-blue-grayish text-blue-dark bg-gray-25"
      }
    />
  );
}

Input.defaultProps = {
  id: "",
  placeholder: "",
};

Input.propTypes = {
  label: PropTypes.string,
};

export default Input;
