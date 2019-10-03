var express = require('express');
var router = express.Router();
var api_gen = require('secure-random-string');
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10)
var User = require('../../../models').User;


router.post('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  if (req.body.email == "")
      {
        response = {
          err_message: "Email cannot be empty"
        }
        res.status(400).send(JSON.stringify(response));
      }
  else if (req.body.password == "")
      {
        response = {
          err_message: "password cannot be empty"
        }
        res.status(400).send(JSON.stringify(response));
      }
  else if (req.body.password != req.body.password_confirmation)
      {
        response = {
          err_message: "Password and Password Confirmaiton must match"
        }
        res.status(400).send(JSON.stringify(response));
      }
  else {
    User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      api_key: api_gen()
    })
      .then(
        user => {
          payload = {
            api_key: user.api_key
            }
          res.status(201).send(payload)
      })
      .catch(
      error => {
        res.status(404)
      }
      )
  }
});

module.exports = router;
