var express = require('express');
var app = express();
var request = require('request');
var Observable = require('rx').Observable;
var RxNode = require('rx-node');
var HttpObservable = require('http-observable');

app.get('/pipe', function (req, res) {
  req.pipe(request('http://api.sba.gov/geodata/city_county_links_for_state_of/ca.json')).pipe(res);
});

app.get('/write', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', req.get('Origin')|| '');
    res.setHeader('Access-Control-Allow-Credentials', true);

  res.write('<html><head></head>');
  //Immediately write the first tag of body. This will make express to add the header `Transfer-Encoding:chunked`
  res.write('<body>');
  Observable.interval(1000).take(10).
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

app.get('/stream', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', req.get('Origin') || '');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.write('<html><head></head>');
    //Immediately write the first tag of body. This will make express to add the header `Transfer-Encoding:chunked`
    res.write('<body>');

    var opts = {
        hostname: 'localhost',
        port: 8000,
        path: '/write'

    };

    new HttpObservable(opts).subscribe(
          function onNext(i) {
              res.write(i);
          },
          function onError() {
              res.write('error');
          },
          function onCompleted() {
              res.end('</body></html>');
          }
      );

});

app.get('/data', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', req.get('Origin') || '');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.write('<html><head></head>');
    res.write('<body>');

    Observable.interval(100).take(10).
      subscribe(
          function onNext(i) {
              res.write(i + '');
          },
          function onError() {
              res.write('ERROR');
          },
          function onCompleted() {
              res.end('</body></html>');
          }
      );

});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
