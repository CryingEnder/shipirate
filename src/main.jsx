import React from "react";
import ReactDOM from "react-dom";
import logger from "./services/logService";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./components/context/ThemeContext";

logger.init();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
