var Http = require('http');
var Inherits = require('util').inherits;
var Rx = require('rx');

var HttpObservable = function HttpObservable (options) {
    console.log('====> const'. options);
    this.options = options;
    console.log('====> '. this.options);
    Rx.ObservableBase.call(this);
}

Inherits(HttpObservable, Rx.ObservableBase);

HttpObservable.prototype.subscribeCore = function(observer) {
    console.log('====> '. this.options);
    var options = this.options || {};

    var req = Http.request(options, function(res) {

        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log('BODY: ' + chunk);
            observer.onNext(chunk);
        });
        res.on('end', function() {
            console.log('No more data in response.');
            observer.onCompleted();
        })
    });

    req.on('error', function(e) {
        console.log(e);
        observer.onError(e);
    });

    req.end();
}
module.exports = HttpObservable;
