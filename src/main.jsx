import React from "react";
import ReactDOM from "react-dom";
import logger from "./services/logService";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./components/context/ThemeContext";
import { CartProvider } from "./components/context/CartContext";

logger.init();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
