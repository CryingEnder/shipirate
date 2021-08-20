import React from "react";
import PropTypes from "prop-types";

function ErrorBox({ error, ...props }) {
  return (
    error && (
      <div
        {...props}
        className="relative text-left mt-4 w-full h-auto select-none rounded-lg font-bold text-shadow border-3 border-solid border-yellow-pirate-ring bg-yellow-pirate text-blue-dark dark:bg-gray-25 dark:border-gray-bluegray-300 dark:text-red-sky-error tablet:rounded-xl"
      >
        <p className="text-xs tablet:text-sm m-2 tablet:m-3">{error}</p>
      </div>
    )
  );
}

ErrorBox.defaultProps = {
  error: "",
};

ErrorBox.propTypes = {
  error: PropTypes.string,
};

export default ErrorBox;
