const dotenv = require('dotenv');
dotenv.config();
var https = require('https');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;


function grab_coords(location) {
var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_KEY}`;
var headers = {
  "Content-Type": "application/json",
}
var data = {
  "address": "Denver,CO",
}
fetch(url, { method: 'GET', params: data})
  .then((res) => {
     return res.json()
})
.then((json) => {
  coordinates = {
  lat: json.results[0].geometry.location.lat,
  lng: json.results[0].geometry.location.lng }
  return coordinates
})
}


module.exports = {grab_coords: grab_coords}
