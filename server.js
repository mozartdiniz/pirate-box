var express = require('express'),
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
        dumpExceptions: true
        , showStack: true
    }))
});

app.get('/', function(req, res){
    res.render('index.html', {
        title: "Index"
    });
});

console.log("Express server listening on port 3000");