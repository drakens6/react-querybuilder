'use strict';
var express = require('express'),
app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var searchfile = require('./search.js');
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/search',searchfile.search);

var server = app.listen('3010', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at port:'+ port);
});

module.exports = app;

