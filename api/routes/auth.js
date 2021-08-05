//Authentication
const { User } = require("../models/user"); // = x.User and x.validate
const tryCatch = require("../middleware/async");
const validator = require("../middleware/validate");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post(
  "/",
  validator(validate),
  tryCatch(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("E-mail does not exist");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Password is invalid");

    const token = user.generateAuthToken();
    res.send(token);
  })
);

function validate(req) {
  const schema = Joi.object().keys({
    email: Joi.string().email().min(10).max(255).required().label("E-mail"),
    password: Joi.string().min(5).max(1024).required().label("Password"),
  });

  return schema.validate(req);
}

module.exports = router;
