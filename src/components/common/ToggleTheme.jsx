import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import PropTypes from "prop-types";

function ToggleTheme({ styles }) {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className={`transition duration-500 ease-in-out rounded-full${
        styles ? ` ${styles}` : ""
      }`}
    >
      {theme === "dark" ? (
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-6 h-6 bg-red-faded text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      ) : (
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-6 h-6 bg-blue-sky-3 text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      )}
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
