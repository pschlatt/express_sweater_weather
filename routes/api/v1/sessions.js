var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var User = require('../../../models').User;

router.post('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  if (req.body.email == "" || req.body.email == null)
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
  else
      {
        User.findOne({
          where:{
            email: req.body.email
          }
        })
        .then(
          user => {
            tester = bcrypt.compareSync(req.body.password,
            user.password);
              if (tester)
                res.status(200).send({
                    api_key: user.api_key
                    })
              else
                res.status(401).send(response = {
                  err_message: "Incorrect Email or Password"
                })
          }
        )
      }
})

module.exports = router;
