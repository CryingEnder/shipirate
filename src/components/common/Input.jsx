import React from "react";

function Input({ ...props }) {
  return (
    <input
      {...props}
      className={
        props.type === "checkbox" || props.type === "radio"
          ? "appearance-none cursor-pointer outline-none w-4 h-4 bg-no-repeat bg-checkbox-unchecked checked:bg-checkbox-checked rounded-lg"
          : "outline-none text-lg rounded-xl px-4 py-2 focus:bg-gray-100 placeholder-blue-grayish text-blue-dark bg-gray-25 w-full"
      }
    />
  );
}

export default Input;
