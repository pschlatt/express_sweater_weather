var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
var https = require('https');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

// fetch.Promise = Bluebird;
// var forecast = require('../../../services/google_api.js')
var User = require('../../../models').User;

router.get('/', function(req, res, next){
  res.setHeader("Content-Type", "application/json");
   grab_coords(req.query.location)

  function grab_coords(place) {
  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${process.env.GOOGLE_KEY}`;
  var headers = {
    "Content-Type": "application/json",
  }
  fetch(url, { method: 'GET'})
    .then((res) => {
       return res.json()
  })
    .then((json) => {
      coordinates = {
      lat: json.results[0].geometry.location.lat,
      lng: json.results[0].geometry.location.lng }
      var url2 = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${String(coordinates.lat)},${String(coordinates.lng)}`;
      fetch(url2, { method: 'GET'})
        .then((res) => {
           return res.json()
      })
      .then((json) => {
         weather = {
        location: req.query.location,   
        currently: json.currently,
        hourly: json.hourly,
        daily: json.daily}

        res.status(200).send(JSON.stringify(weather))
      }

    ).catch(error => res.status(500).send({ error }) )

    })
  }
})

module.exports = router
