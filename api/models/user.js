const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(5)
      .max(30)
      .required()
      .label("Username"),
    email: Joi.string().email().min(10).max(255).required().label("E-mail"),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
      .label("Password")
      .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()]{3,30}$"))
      .messages({
        "string.pattern.base":
          "Password may only contain alphanumeric or special characters",
      }),
    repeatPassword: Joi.valid(Joi.ref("password")).label("Repeat password"),
  }).with("password", "repeatPassword");

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
