import React from "react";
import PropTypes from "prop-types";
function Button({
  label,
  labelIcon: LabelIcon,
  labelIconSize,
  fontColor,
  fontSize,
  type,
  styles,
  isGreen,
}) {
  if (!fontColor) fontColor = "text-blue-dark";
  if (!type) type = "button";
  if (!labelIconSize) labelIconSize = "w-6";
  return (
    <a href="#">
      <button
        className={`${fontColor ? `${fontColor} ` : ""}${
          styles ? `${styles} ` : ""
        }${
          type === "submit" && isGreen
            ? "bg-green-normal ring ring-green-ring transition-colors hover:bg-green-hover hover:ring-green-hover-ring "
            : "bg-yellow-pirate ring ring-yellow-pirate-ring transition-colors hover:bg-yellow-pirate-hover hover:ring-yellow-pirate-hover-ring "
        }rounded-2xl shadow-md font-semibold focus:outline-none px-4 py-2`}
        type={type}
      >
        {LabelIcon && (
          <div className="flex flex-row justify-center items-center space-x-1">
            <LabelIcon
              className={`${labelIconSize} fill-current ${fontColor}`}
              alt="Label icon"
            />
            <p className={fontSize ? fontSize : ""}>{label}</p>
          </div>
        )}
        {!LabelIcon && <p className={fontSize ? fontSize : ""}>{label}</p>}
      </button>
    </a>
  );
}

Button.defaultProps = {
  labelIcon: "",
  labelIconSize: "",
  fontColor: "",
  fontStyle: "",
  styles: "",
  isGreen: false,
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  labelIcon: PropTypes.any,
  labelIconSize: PropTypes.string,
  fontColor: PropTypes.string,
  fontSize: PropTypes.string,
  styles: PropTypes.string,
  isGreen: PropTypes.bool,
};

export default Button;
