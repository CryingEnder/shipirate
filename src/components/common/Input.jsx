import React from "react";
import { PropTypes } from "prop-types";

function Input({ type, id, placeholder }) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={
        type === "checkbox"
          ? "appearance-none cursor-pointer outline-none w-4 h-4 bg-no-repeat bg-checkbox-unchecked checked:bg-checkbox-checked rounded-lg"
          : "outline-none text-lg rounded-xl px-4 py-2 focus:bg-gray-100 placeholder-blue-grayish text-blue-dark bg-gray-25 w-full"
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
