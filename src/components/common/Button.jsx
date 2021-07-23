import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
function Button({
  label,
  labelIcon: LabelIcon,
  labelIconSize,
  linkPath,
  fontColor,
  fontSize,
  type,
  styles,
  isGreen,
  goBack,
  ...props
}) {
  const greenStyle =
    "bg-green-normal ring ring-green-ring transition-colors hover:bg-green-hover hover:ring-green-hover-ring ";
  const normalStyle =
    "transition-colors bg-yellow-pirate ring ring-yellow-pirate-ring hover:bg-yellow-pirate-hover hover:ring-yellow-pirate-hover-ring dark:bg-red-sky-1 dark:ring-red-sky-2 dark:hover:bg-red-sky-3 dark:hover:ring-red-sky-4 ";
  const buttonStyle = `${fontColor ? `${fontColor} ` : ""}${
    styles ? `${styles} ` : ""
  }${
    isGreen ? greenStyle : normalStyle
  }rounded-2xl shadow-md font-semibold focus:outline-none px-4 py-2`;

  let history = goBack ? useHistory() : null;

  const doGoBack = history
    ? () => {
        history.goBack();
      }
    : null;

  return (
    <Fragment>
      {!goBack && type === "submit" && (
        <button {...props} className={buttonStyle} type={type}>
          {LabelIcon && (
            <div className="flex flex-row justify-center items-center space-x-1">
              <LabelIcon
                className={`fill-current ${labelIconSize}`}
                alt="Label icon"
              />
              <p className={fontSize ? fontSize : ""}>{label}</p>
            </div>
          )}
          {!LabelIcon && <p className={fontSize ? fontSize : ""}>{label}</p>}
        </button>
      )}
      {!goBack && linkPath.search("#") !== 0 && type !== "submit" && (
        <Link to={linkPath}>
          <button {...props} className={buttonStyle} type={type}>
            {LabelIcon && (
              <div className="flex flex-row justify-center items-center space-x-1">
                <LabelIcon
                  className={`fill-current ${labelIconSize}`}
                  alt="Label icon"
                />
                <p className={fontSize ? fontSize : ""}>{label}</p>
              </div>
            )}
            {!LabelIcon && <p className={fontSize ? fontSize : ""}>{label}</p>}
          </button>
        </Link>
      )}
      {!goBack && linkPath.search("#") === 0 && type !== "submit" && (
        <a href={linkPath}>
          <button {...props} className={buttonStyle} type={type}>
            {LabelIcon && (
              <div className="flex flex-row justify-center items-center space-x-1">
                <LabelIcon
                  className={`fill-current ${labelIconSize}`}
                  alt="Label icon"
                />
                <p className={fontSize ? fontSize : ""}>{label}</p>
              </div>
            )}
            {!LabelIcon && <p className={fontSize ? fontSize : ""}>{label}</p>}
          </button>
        </a>
      )}
      {goBack && type !== "submit" && (
        <button
          {...props}
          onClick={doGoBack}
          className={buttonStyle}
          type={type}
        >
          {LabelIcon && (
            <div className="flex flex-row justify-center items-center space-x-1">
              <LabelIcon
                className={`fill-current ${labelIconSize}`}
                alt="Label icon"
              />
              <p className={fontSize ? fontSize : ""}>{label}</p>
            </div>
          )}
          {!LabelIcon && <p className={fontSize ? fontSize : ""}>{label}</p>}
        </button>
      )}
    </Fragment>
  );
}

Button.defaultProps = {
  labelIcon: "",
  labelIconSize: "w-6",
  linkPath: "/",
  goBack: false,
  fontColor: "text-blue-dark dark:text-blue-whiteish-2",
  fontStyle: "",
  styles: "",
  isGreen: false,
  type: "button",
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  labelIcon: PropTypes.any,
  labelIconSize: PropTypes.string,
  linkPath: PropTypes.string,
  goBack: PropTypes.bool,
  fontColor: PropTypes.string,
  fontSize: PropTypes.string,
  styles: PropTypes.string,
  isGreen: PropTypes.bool,
};

export default Button;
