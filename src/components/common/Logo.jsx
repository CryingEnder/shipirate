import React from "react";
import { logo } from "./../../utils/images";
import PropTypes from "prop-types";

function Logo({ styles }) {
  return (
    <a className={`flex flex-row items-center space-x-3 ${styles}`} href="/">
      <img className="w-10 laptop:w-12" src={logo} alt="A pirate ship logo" />
      <h1 className="text-gray-100 font-normal font-pirate-gr tracking-wider text-shadow-lg text-2xl tablet:text-3xl">
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
