import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./../context/ThemeContext";
import PropTypes from "prop-types";

function Input({ label, styles, linkPath, ...props }) {
  const { theme, setTheme } = useContext(ThemeContext);

  //error message TODO:

  const transformOn =
    "transition-all transform -translate-y-3 text-smallest -translate-x-1 tablet:translate-x-0 tablet:-translate-y-4 tablet:text-xs";
  const transformOff =
    "transition-all transform translate-y-0 text-xs tablet:text-base";
  const [labelTransformClass, setLabelTransformClass] = useState(transformOff);
  const [inputState, setInputState] = useState("");

  useEffect(() => {
    if (inputState) setLabelTransformClass(transformOn);
  }, [inputState]);

  function toggleTransform() {
    if (labelTransformClass === transformOff)
      setLabelTransformClass(transformOn);
    else if (!inputState) setLabelTransformClass(transformOff);
  }

  function handleChange(e) {
    let inputValue = e.target.value;
    setInputState(inputValue);
  }

  return (
    <div
      className={`relative flex flex-row justify-start items-center${
        styles ? ` ${styles}` : ""
      }`}
    >
      {props.type !== "checkbox" && props.type !== "radio" && (
        <div className="max-w-min">
          <input
            onChange={handleChange}
            onFocus={toggleTransform}
            onBlur={toggleTransform}
            className={`outline-none text-sm tablet:text-lg rounded-lg p-3 tablet:p-4 text-blue-dark focus:bg-gray-100 placeholder-blue-grayish bg-gray-25`}
            name={props.name}
            {...props}
          />
          {props.error && (
            <div className="relative flex flex-row justify-start items-center mt-3 w-full h-auto select-none rounded-lg font-bold text-shadow border-3 border-solid border-yellow-pirate-ring bg-yellow-pirate text-blue-dark dark:bg-gray-25 dark:border-gray-bluegray-300 dark:text-red-sky-error tablet:w-full tablet:absolute tablet:top-0 tablet:bottom-0 tablet:my-auto tablet:ml-6 tablet:rounded-xl tablet:left-full tablet:h-4/5">
              <div className="absolute left-4 -top-3 w-3 h-3 clip-top-triangle bg-yellow-pirate-ring dark:bg-gray-bluegray-300 tablet:top-auto tablet:-left-4 tablet:w-4 tablet:h-4 tablet:clip-left-triangle" />
              <p className="text-xs mx-2 my-1 tablet:m-4">{props.error}</p>
            </div>
          )}
        </div>
      )}
      {(props.type === "checkbox" || props.type === "radio") && (
        <input
          {...props}
          className={`appearance-none cursor-pointer outline-none w-8 h-8 tablet:w-10 tablet:h-10 -ml-1 rounded-lg bg-no-repeat ${
            theme !== "dark"
              ? "bg-checkbox-unchecked checked:bg-checkbox-checked"
              : "bg-checkbox-unchecked-dark checked:bg-checkbox-checked-dark"
          }`}
        />
      )}
      {props.type === "checkbox" || props.type === "radio" ? (
        linkPath ? (
          <label
            className="cursor-pointer text-base tablet:text-lg pl-2 hover:underline text-blue-dark dark:text-purple-light-3"
            htmlFor={props.id}
          >
            <Link target="_blank" to={linkPath}>
              {label}
            </Link>
          </label>
        ) : (
          <label
            className="cursor-pointer text-base tablet:text-lg font-semibold pl-2 text-blue-dark dark:text-purple-light-3"
            htmlFor={props.id}
          >
            {label}
          </label>
        )
      ) : (
        <label
          className={`top-3.5 tablet:top-4.5 absolute block cursor-text ml-4 text-blue-dark ${labelTransformClass}`}
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
  linkPath: "",
  styles: "",
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  linkPath: PropTypes.string,
  styles: PropTypes.string,
};

export default Input;
