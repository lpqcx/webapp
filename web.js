var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());
app.use('/img',express.static(__dirname + '/img'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/css',express.static(__dirname + '/css'));

var buf = fs.readFileSync('index.html');

app.get('/', function(request, response) {
  response.send(buf.toString());
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
