import React from "react";
import { Link } from "react-router-dom";
import { logo } from "./../../utils/images";
import PropTypes from "prop-types";

function Logo({ styles, fontColor, fontSize, phoneLogoSize }) {
  if (!fontColor) fontColor = "text-gray-100";
  if (!fontSize) fontSize = "text-2xl tablet:text-3xl";
  return (
    <Link to="/" className={`flex flex-row items-center space-x-3 ${styles}`}>
      <img
        className={`${
          phoneLogoSize ? `${phoneLogoSize} ` : ""
        }w-10 laptop:w-12`}
        src={logo}
        alt="A pirate ship logo"
      />
      <h1
        className={`${fontColor} ${fontSize} font-normal font-pirate-gr text-shadow-lg`}
      >
        Shipirate VPN
      </h1>
    </Link>
  );
}

Logo.defaultProps = {
  styles: "",
  fontColor: "",
  fontSize: "",
  phoneLogoSize: "",
};

Logo.propTypes = {
  styles: PropTypes.string,
  fontColor: PropTypes.string,
  fontSize: PropTypes.string,
  phoneLogoSize: PropTypes.string,
};

export default Logo;
