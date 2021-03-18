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
}) {
  return (
    <div className="grid gap-y-8 laptop:items-center laptop:grid-cols-2">
      <article className={reversedOrder ? "px-6 laptop:order-1" : "px-6"}>
        <img className="w-12" src={logoSrc} alt={logoAlt} />
        <h2 className="mt-2 text-shadow text-blue-dark">{heading}</h2>
        <p className="my-6 text-gray-600">{text}</p>
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
};

export default Feature;
