var http = require('http');
http.createServer(function(petition, answer){
   var html_code = '<html> <head> <title> Hello world simple example with Nodejs </title> </head> <body> Hello world </body> </html>';
   answer.writeHead(200, 'text/html');
   answer.end(html_code);
}).listen(3000, '127.0.0.1');
console.log('The server is working correctly in http://localhost:3000/');