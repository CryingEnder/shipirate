import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./../context/ThemeContext";
import PropTypes from "prop-types";

function Input({ label, styles, linkPath, checkboxLabelFontSize, ...props }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const transformOn = "transition-all transform -translate-y-5 text-xs";
  const transformOff = "transition-all transform translate-y-0 text-base";
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

  function handleInput(e) {
    let inputValue = e.target.value;
    setInputState(inputValue);
    // console.log(inputValue.length % 4 === 0);
    // if (
    //   inputValue.length > 0 &&
    //   inputValue.length < 16 &&
    //   inputValue.length % 4 === 0
    // )
    //   e.target.value += " ";
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
          className={`appearance-none cursor-pointer outline-none w-10 h-10 -ml-1 rounded-lg bg-no-repeat ${
            theme !== "dark"
              ? "bg-checkbox-unchecked checked:bg-checkbox-checked"
              : "bg-checkbox-unchecked-dark checked:bg-checkbox-checked-dark"
          }`}
        />
      )}
      {props.type !== "checkbox" && props.type !== "radio" && (
        <input
          {...props}
          onChange={handleInput}
          onFocus={toggleTransform}
          onBlur={toggleTransform}
          className="outline-none text-lg rounded-lg p-4 focus:bg-gray-100 placeholder-blue-grayish bg-gray-25 w-full"
        />
      )}
      {props.type === "checkbox" || props.type === "radio" ? (
        linkPath ? (
          <label
            className="cursor-pointer text-base pl-2 hover:underline text-blue-dark dark:text-purple-light-3"
            htmlFor={props.id}
          >
            <Link target="_blank" to={linkPath}>
              {label}
            </Link>
          </label>
        ) : (
          <label
            className="cursor-pointer text-lg font-semibold pl-2 text-blue-dark dark:text-purple-light-3"
            htmlFor={props.id}
          >
            {label}
          </label>
        )
      ) : (
        <label
          className={`absolute cursor-text ml-4 text-blue-dark ${labelTransformClass}`}
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
    </div>
  );
}

Input.defaultProps = {
  checkboxLabelFontSize: "",
  label: "",
  linkPath: "",
  styles: "",
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  checkboxLabelFontSize: PropTypes.string,
  label: PropTypes.string,
  linkPath: PropTypes.string,
  styles: PropTypes.string,
};

export default Input;
