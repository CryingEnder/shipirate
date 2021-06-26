const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
// const members = require('../routes/members');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  // app.use('/api/members', members);
}