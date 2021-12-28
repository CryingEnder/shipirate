const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

module.exports = function (app) {
  app.use("/", express.static("../dist"));
  app.use("/checkout", express.static("../dist"));
  app.use("/404", express.static("../dist"));
  app.use(helmet());
  app.use(compression());
};
