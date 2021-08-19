const { User, validate } = require("../models/user"); // = x.User and x.validate
const tryCatch = require("../middleware/async");
const auth = require("../middleware/auth");
const validator = require("../middleware/validate");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const config = require("config");
const express = require("express");
const router = express.Router();

router.get(
  "/me",
  auth,
  tryCatch(async (req, res) => {
    const user = await User.findById(req.user._id).select(
      "-password -_id -__v"
    );
    res.status(200).send(user);
  })
);

router.post(
  "/",
  validator(validate),
  tryCatch(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email already exists.");

    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    const expirationTime = new Date(
      new Date().getTime() + config.get("jwtTimer") * 1000
    );

    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        expires: expirationTime,
      })
      .send({
        _id: user._id,
        username: user.username,
        email: user.email,
      }); //TODO: add secure: true on HTTPS
  })
);

router.patch(
  "/me",
  [auth, validator(validateInput)],
  tryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (req.body.newUsername) {
      if (user.username === req.body.newUsername)
        return res
          .status(400)
          .send("The new username is not different from the current username.");
      await User.updateOne(user, { username: req.body.newUsername });
      return res.status(200).send("The username has been updated.");
    }

    if (req.body.newEmail) {
      if (user.email === req.body.newEmail)
        return res
          .status(400)
          .send("The new email is not different from the current email.");

      const emailWasUsed = await User.findOne({ email: req.body.newEmail });
      if (emailWasUsed)
        return res.status(403).send("The new email has already been used.");

      await User.updateOne(user, { email: req.body.newEmail });
      return res.status(200).send("The email has been updated.");
    }

    if (req.body.currentPassword && req.body.newPassword) {
      const validateCurrentPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!validateCurrentPassword)
        return res
          .status(400)
          .send("The current provided password is not correct.");
      const salt = await bcrypt.genSalt(10);
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
      await User.updateOne(user, { password: req.body.newPassword });
      return res.status(200).send("The password has been updated.");
    }

    return res.status(500).send("Something failed.");
  })
);

router.delete(
  "/me",
  auth,
  tryCatch(async (req, res) => {
    await User.findByIdAndDelete(req.user._id);

    res.status(200).send("Your account has been deleted");
  })
);

function validateInput(req) {
  const schema = Joi.object()
    .keys({
      newUsername: Joi.string().alphanum().min(5).max(30).label("New username"),

      newEmail: Joi.string().email().min(10).max(255).label("New email"),
      repeatNewEmail: Joi.valid(Joi.ref("newEmail"))
        .label("Repeat new email")
        .messages({ "any.only": "Repeat new email must match new email" }),

      currentPassword: Joi.string()
        .min(5)
        .max(1024)
        .label("Current password")
        .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()]{3,30}$"))
        .messages({
          "string.pattern.base":
            "Password may only contain alphanumeric or special characters",
        }),
      newPassword: Joi.string()
        .min(5)
        .max(1024)
        .disallow(Joi.ref("currentPassword"))
        .label("New password")
        .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()]{3,30}$"))
        .messages({
          "string.pattern.base":
            "Password may only contain alphanumeric or special characters",
        }),
      repeatNewPassword: Joi.valid(Joi.ref("newPassword"))
        .label("Repeat new password")
        .messages({
          "any.only": "Repeat new password must match new password",
        }),
    })
    .xor("newUsername", "newEmail", "currentPassword")
    .with("newEmail", "repeatNewEmail")
    .with("currentPassword", ["newPassword", "repeatNewPassword"]);

  return schema.validate(req);
}

module.exports = router;
