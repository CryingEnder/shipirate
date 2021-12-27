const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
if (process.env.NODE_ENV !== "production") require("./startup/cors")(app);
if (process.env.NODE_ENV === "production") require("./startup/prod")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

const port = process.env.NODE_ENV === "test" ? 3002 : process.env.PORT || 3000;

const server = app.listen(port, () => {
  winston.info(`Connected to port ${port}`);
});

module.exports = server;
