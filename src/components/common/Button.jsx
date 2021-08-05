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
    "transition-colors bg-yellow-pirate ring ring-yellow-pirate-ring disabled:opacity-80 disabled:pointer-events-none hover:bg-yellow-pirate-hover hover:ring-yellow-pirate-hover-ring dark:bg-red-sky-1 dark:ring-red-sky-2 dark:hover:bg-red-sky-3 dark:hover:ring-red-sky-4 ";
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
        <div className="max-w-full relative flex flex-col tablet:w-auto">
          <button
            {...props}
            className={`${buttonStyle} self-center`}
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
          {props.error && (
            <div className="relative flex flex-row justify-start items-center mt-4 w-full h-auto select-none rounded-lg font-bold text-shadow border-3 border-solid border-yellow-pirate-ring bg-yellow-pirate text-blue-dark dark:bg-gray-25 dark:border-gray-bluegray-300 dark:text-red-sky-error tablet:bottom-0 tablet:top-0 tablet:my-auto tablet:min-w-max tablet:absolute tablet:left-full tablet:ml-7 tablet:rounded-xl">
              <div className="absolute left-0 right-0 mx-auto -top-3 w-3 h-3 clip-top-triangle bg-yellow-pirate-ring dark:bg-gray-bluegray-300 tablet:top-auto tablet:-left-4 tablet:right-auto tablet:m-auto tablet:w-4 tablet:h-4 tablet:clip-left-triangle" />
              <p className="text-xs mx-2 my-1 tablet:m-4 tablet:max-w-small">
                {props.error}
              </p>
            </div>
          )}
        </div>
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
  fontColor: "text-blue-dark dark:text-blue-whiteish-2",
  fontStyle: "",
  goBack: false,
  isGreen: false,
  labelIcon: "",
  labelIconSize: "w-6",
  linkPath: "/",
  styles: "",
  type: "button",
};

Button.propTypes = {
  fontColor: PropTypes.string,
  fontSize: PropTypes.string,
  goBack: PropTypes.bool,
  isGreen: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelIcon: PropTypes.any,
  labelIconSize: PropTypes.string,
  linkPath: PropTypes.string,
  styles: PropTypes.string,
};

export default Button;
