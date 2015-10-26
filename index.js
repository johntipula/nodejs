var http = require('http');
var url = require('url');
var fs = require('fs');
var server = require('./modules/server');
server.create(http, url, fs);
console.log('The server is working correctly in http://localhost:3000/');