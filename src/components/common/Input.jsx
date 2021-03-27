import React, { useState } from "react";
import PropTypes from "prop-types";

function Input({ label, styles, linkLabel, href, ...props }) {
  const transformOn = "transition-all transform -translate-y-5 text-xs";
  const transformOff = "transition-all transform translate-y-0 text-lg";
  const [labelTransformClass, setLabelTransformClass] = useState(transformOff);
  const [inputState, setInputState] = useState("");

  function toggleTransform() {
    if (labelTransformClass === transformOff)
      setLabelTransformClass(transformOn);
    else if (!inputState) setLabelTransformClass(transformOff);
  }

  function handleInput(e) {
    setInputState(e.target.value);
  }

  return (
    <div
      className={`relative flex flex-row justify-start items-center${
        styles ? ` ${styles}` : ""
      }`}
    >
      {(props.type === "checkbox" || props.type === "radio") && (
        <input
          {...props}
          className="appearance-none cursor-pointer outline-none w-4 h-4 bg-no-repeat bg-checkbox-unchecked checked:bg-checkbox-checked rounded-lg"
        />
      )}
      {props.type !== "checkbox" && props.type !== "radio" && (
        <input
          {...props}
          onChange={handleInput}
          onFocus={toggleTransform}
          onBlur={toggleTransform}
          className="outline-none text-lg rounded-lg p-4 focus:bg-gray-100 placeholder-blue-grayish text-blue-dark bg-gray-25 w-full"
        />
      )}
      {props.type === "checkbox" || props.type === "radio" ? (
        linkLabel ? (
          <label
            className="cursor-pointer text-base pl-2 hover:underline"
            htmlFor={props.id}
          >
            <a target="_blank" href={href}>
              {label}
            </a>
          </label>
        ) : (
          <label className="cursor-pointer text-base pl-2" htmlFor={props.id}>
            {label}
          </label>
        )
      ) : (
        <label
          className={`absolute cursor-text ml-4 ${labelTransformClass}`}
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
    </div>
  );
}

Input.defaultProps = {
  label: "",
  linkLabel: false,
  href: "/",
  styles: "",
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  linkLabel: PropTypes.bool,
  href: PropTypes.string,
  styles: PropTypes.string,
};

export default Input;
