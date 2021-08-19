import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";

function Feature({
  logoSrc,
  logoAlt,
  heading,
  text,
  buttonLabel,
  picture: Picture,
  reversedOrder,
  ...props
}) {
  return (
    <div className="relative grid gap-y-8 laptop:items-center laptop:grid-cols-2">
      <div {...props} className="w-0 h-0 absolute top-0 -mt-24"></div>
      <article className={reversedOrder ? "px-6 laptop:order-1" : "px-6"}>
        <img className="w-12" src={logoSrc} alt={logoAlt} />
        <h2 className="mt-2 text-shadow text-blue-dark dark:text-blue-whiteish-1">
          {heading}
        </h2>
        <p className="my-6 text-gray-600 dark:text-blue-whiteish-2">{text}</p>
        <Button label={buttonLabel} />
      </article>
      <Picture className="mx-6 shadow-md rounded-xl overflow-hidden" />
    </div>
  );
}

Feature.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  logoAlt: PropTypes.string,
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  picture: PropTypes.func.isRequired,
  reversedOrder: PropTypes.bool,
  id: PropTypes.string,
};

export default Feature;
