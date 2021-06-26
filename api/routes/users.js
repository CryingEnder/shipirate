const { User, validate } = require("../models/user"); // = x.User and x.validate
const tryCatch = require("../middleware/async");
const auth = require("../middleware/auth");
const validator = require("../middleware/validate");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.get(
  "/me",
  auth,
  tryCatch(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  })
);

router.post(
  "/",
  validator(validate),
  tryCatch(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("E-mail already exists.");

    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token") //Enabling the view of x-auth-token by the browser
      .send({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
  })
);

router.put(
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
          .send("The new e-mail is not different from the current e-mail.");
      await User.updateOne(user, { email: req.body.newEmail });
      return res.status(200).send("The e-mail has been updated.");
    }

    if (req.body.currentPassword && req.body.newPassword) {
      const validateCurrentPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!validateCurrentPassword)
        return res
          .status(400)
          .send("The current password provided is not correct.");
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
      newUsername: Joi.string().alphanum().min(5).max(30),

      newEmail: Joi.string().email().min(10).max(255),
      repeatNewEmail: Joi.ref("newEmail"),

      currentPassword: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(5)
        .max(1024),
      newPassword: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(5)
        .max(1024)
        .disallow(Joi.ref("currentPassword")),
      repeatNewPassword: Joi.ref("newPassword"),
    })
    .xor("newUsername", "newEmail", "currentPassword")
    .with("newEmail", "repeatNewEmail")
    .with("currentPassword", ["newPassword", "repeatNewPassword"]);

  return schema.validate(req);
}

module.exports = router;
