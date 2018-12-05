const express = require('express');

const Router = express.Router();

Router.post('/register', function(req, res) {
  console.log('register success');
})

module.exports = Router;
