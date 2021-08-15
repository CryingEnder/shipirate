const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const plans = require("../routes/plans");
const testimonials = require("../routes/testimonials");
const cookieParser = require("cookie-parser");

module.exports = function (app) {
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/plans", plans);
  app.use("/api/testimonials", testimonials);
};
