import React from "react";
import PropTypes from "prop-types";

function InputLabel({ children, label, linkLabel, htmlFor, href, styles }) {
  console.log(label);
  console.log(typeof label);
  return (
    <div
      className={`flex flex-row justify-start items-center${
        styles ? ` ${styles}` : ""
      }`}
    >
      {children}
      {linkLabel ? (
        <label
          className="cursor-pointer text-base ml-2 hover:underline"
          htmlFor={htmlFor}
        >
          <a href={href}>{label}</a>
        </label>
      ) : (
        <label className="cursor-pointer text-base ml-2" htmlFor={htmlFor}>
          {label}
        </label>
      )}
    </div>
  );
}

InputLabel.defaultProps = {
  htmlFor: "",
  label: "",
  linkLabel: false,
  href: "/",
  styles: "",
};

InputLabel.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  linkLabel: PropTypes.bool,
  href: PropTypes.string,
  styles: PropTypes.string,
};

export default InputLabel;
