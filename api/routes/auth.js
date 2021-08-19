//Authentication
const { User } = require("../models/user"); // = x.User and x.validate
const tryCatch = require("../middleware/async");
const validator = require("../middleware/validate");
const auth = require("../middleware/auth");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const config = require("config");
const express = require("express");
const router = express.Router();

router.post(
  "/",
  validator(validate),
  tryCatch(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email does not exist");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Password is invalid");

    const token = user.generateAuthToken();

    const expirationTime = new Date(
      Date.now() +
        (req.body.rememberMe
          ? config.get("jwtTimer") * 3
          : config.get("jwtTimer")) *
          1000
    );

    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        expires: expirationTime,
      })
      .send("You have logged in"); //TODO: add secure: true on HTTPS)
  })
);

router.delete(
  "/logout",
  auth,
  tryCatch((req, res) => {
    res.clearCookie("jwt").send("You have successfully logged out");
  })
);

function validate(req) {
  const schema = Joi.object().keys({
    email: Joi.string().email().min(10).max(255).required().label("Email"),
    password: Joi.string().min(5).max(1024).required().label("Password"),
    rememberMe: Joi.bool().required().label("Remember me"),
  });

  return schema.validate(req);
}

module.exports = router;
