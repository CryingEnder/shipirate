import React from "react";
import PropTypes from "prop-types";
function Button({ label, fontColor, fontSize }) {
  if (!fontColor) fontColor = "text-blue-dark";
  return (
    <a href="#">
      <button
        className={`${
          fontColor ? `${fontColor} ` : ""
        }rounded-2xl shadow-md font-semibold bg-yellow-pirate ring ring-yellow-pirate-ring hover:bg-yellow-pirate-hover hover:ring-yellow-pirate-hover-ring focus:outline-none px-4 py-1 tablet:px-5 tablet:py-1.5`}
        type="button"
      >
        <p className={fontSize ? fontSize : ""}>{label}</p>
      </button>
    </a>
  );
}

Button.defaultProps = {
  fontColor: "",
  titleStyle: "",
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  fontColor: PropTypes.string,
  fontSize: PropTypes.string,
};

export default Button;
