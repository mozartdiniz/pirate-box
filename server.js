var express = require('express'),
    finder = require("./torrentfinder"),
    http = require('http');

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());

    app.engine('.html', require('ejs').__express);
    app.set('views', __dirname + '/public/html');
    app.use(express.static(__dirname + '/public'));

    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }))
});

app.get('/', function(req, res) {
    res.render('index.html', {
        title: "Index"
    });
});

//io.sockets.on('connection', function (socket) {
//
//  socket.emit('news', { hello: 'world' });
//  socket.on('my other event', function (data) {
//    console.log(data);
//  });
//
//  socket.on('search', function (data) {
//
//    var mediaOptions = {};
//
//    var terms = data.terms.split(' ');
//
//    var contains = new Array();
//    contains[0] = "720p";
//
//    mediaOptions.terms = terms;
//    mediaOptions.contains = contains;
//
//    mediaOptions.doNotContain = new Array();
//
//    var callbackFunctionWithBestMatch = function(result) {
//        socket.emit ('searchReturn', result);
//    };
//
//    finder.Search(terms, callbackFunctionWithBestMatch);
//
//  })
//
//});

console.log("Express server listening on port 3000");