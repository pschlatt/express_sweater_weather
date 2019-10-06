const dotenv = require('dotenv');
dotenv.config();
var https = require('https');

function find_coordinates(location){
var options = {
  host: 'maps.googleapis.com',
  port: 443,
  path: "/maps/api/geocode/json?address=" + location + "&key=" + process.env.GOOGLE_KEY,
  method: 'GET'
}

https.request(options, function(res){
  var body = ' ';

  res.on('data', function(chunk){
    body += chunk;
  });
  res.on('end', function(){
    var text = JSON.parse(body);
    console.log(text.results[0].geometry.location);
  })
}).end();
}

find_coordinates("Denver,CO")

module.exports = {find_coordinates: find_coordinates}
