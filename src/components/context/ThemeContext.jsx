import React, { useState, useEffect, createContext } from "react";

function getInitialTheme() {
  if (typeof window !== "undefined" && window.localStorage) {
    //check if it's a browser
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      if (storedPrefs !== "light" && storedPrefs !== "dark")
        window.localStorage.setItem("color-theme", "light");
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }

  return "light";
}

export const ThemeContext = createContext();

export function ThemeProvider({ initialTheme, children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  function rawSetTheme(rawTheme) {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);

    localStorage.setItem("color-theme", rawTheme);
  }

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
