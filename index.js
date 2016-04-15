var express = require('express');
var app = express();
var request = require('request');

app.get('/pipe', function (req, res) {
  req.pipe(request('http://api.sba.gov/geodata/city_county_links_for_state_of/ca.json')).pipe(res);
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
