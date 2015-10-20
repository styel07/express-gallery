var express = require('express');
var server = express();

// Tell Express which Template engine we are using by NPM module name
server.set('view engine', 'jade');

// Tell Express where our template files live
server.set('views', './views');

server.use(express.static('./public'));

server.get('/', function(req,res) {
  res.render('index', {

  });
});

// expresses version of setting up a new server
var app = server.listen(3000, function() {
  var host = app.address().address;
  var port = app.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});