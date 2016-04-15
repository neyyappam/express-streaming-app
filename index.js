var express = require('express');
var app = express();
var request = require('request');
var Observable = require('rx').Observable;

app.get('/pipe', function (req, res) {
  req.pipe(request('http://api.sba.gov/geodata/city_county_links_for_state_of/ca.json')).pipe(res);
});

app.get('/write', function (req, res) {
  res.write('<html><head></head>');
  //Immediately write the first tag of body. This will make express to add the header `Transfer-Encoding:chunked`
  res.write('<body>');
  Observable.interval(10).take(10).
    subscribe(
        function onNext(i) {
            res.write('<div>' + i + ' Hello world' + '</div>');
        },
        function onError() {
            res.write('error');
        },
        function onCompleted() {
            res.end('</body></html>');
        }
    );

});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
