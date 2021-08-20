import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import PropTypes from "prop-types";

function ToggleTheme({ styles }) {
  const left = "left-0.5 laptop:left-1";
  const right = "left-5.5 laptop:left-8";
  const { theme, setTheme } = useContext(ThemeContext);
  const [buttonPosition, setButtonPosition] = useState("");

  useEffect(() => {
    setButtonPosition(theme === "dark" ? right : left);
  }, [theme]);

  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`shadow-sm relative mt-1 bg-blue-sky-3 dark:bg-gray-25 rounded-full cursor-pointer flex flex-row justify-center items-center w-10 h-5 laptop:w-14 laptop:h-7${
        styles ? ` ${styles}` : ""
      }`}
    >
      <div
        className={`shadow-lg absolute laptop:top-1 rounded-full transition-all w-4 h-4 laptop:w-5 laptop:h-5 bg-yellow-pirate dark:bg-purple-700 ${buttonPosition}`}
      />
    </div>
  );
}

ToggleTheme.defaultProps = {
  styles: "",
};

ToggleTheme.propTypes = {
  styles: PropTypes.string,
};

export default ToggleTheme;
