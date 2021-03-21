import React from "react";
import { logo } from "./../../utils/images";
import PropTypes from "prop-types";

function Logo({ styles, fontColor, fontSize }) {
  if (!fontColor) fontColor = "text-gray-100";
  if (!fontSize) fontSize = "text-2xl tablet:text-3xl";
  return (
    <a className={`flex flex-row items-center space-x-3 ${styles}`} href="/">
      <img className="w-10 laptop:w-12" src={logo} alt="A pirate ship logo" />
      <h1
        className={`${fontColor} ${fontSize} font-normal font-pirate-gr text-shadow-lg`}
      >
        Shipirate VPN
      </h1>
    </a>
  );
}

Logo.defaultProps = {
  styles: "",
};

Logo.propTypes = {
  styles: PropTypes.string,
};

export default Logo;
