import React from "react";
import PropTypes from "prop-types";

function Badge({ label }) {
  return (
    <div className="text-base rounded-full font-medium inline-block bg-yellow-badge px-2 py-0.5">
      {label}
    </div>
  );
}

Badge.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Badge;
