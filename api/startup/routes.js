const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const cookieParser = require("cookie-parser");

module.exports = function (app) {
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};
