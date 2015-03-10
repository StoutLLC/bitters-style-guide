var express = require('express');
var path = require('path');
var config = require('./config');

var app = express();
var server = require('http').createServer(app);

app.use(
    "/", //the URL throught which you want to access to you static content
    express.static(__dirname) //where your static content is located in your filesystem
);
app.use(require('connect-livereload')());
server.listen(config.port, undefined, function() {
    console.log('Express server listening on port %d', config.port);
});