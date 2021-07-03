//Authentication
const { User } = require('../models/user'); // = x.User and x.validate
const tryCatch = require('../middleware/async'); 
const validator = require('../middleware/validate');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', validator(validate), tryCatch(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid e-mail.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password.');

  const token = user.generateAuthToken();
  res.send({token});
}));

function validate(req) {
  const schema = Joi.object().keys({
    email: Joi.string().email().min(10).max(255).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(5).max(1024).required()
  });

  return schema.validate(req);
}

module.exports = router;