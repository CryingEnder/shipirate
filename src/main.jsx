import React from "react";
import ReactDOM from "react-dom";
import logger from "./services/logService";
import "./index.css";
import App from "./App";

logger.init();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
