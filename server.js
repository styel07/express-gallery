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

// This page displace a single photo in the gallery
server.get('/gallery/:id', function(req, res) {
  res.send('This is the a photo');
});

// This page displays a form that the user can upload a new photo
server.get('/gallery/new', function(req,res) {
  res.render('gallery-new');
});

// user wants to create a new gallery photo
server.post('/gallery', function(req, res) {
  res.send('you can send photos to the gallery on this page');
});

// gets a page where you can edit the photo selected in the id: paam
server.get('/gallery/:id/edit', function(req, res) {
  res.send('edit photos here!');
});

// you can update a gallery photo identified by the :id param
server.put('/gallery/:id', function(req,res) {
  res.send('You can update a photo here!');
});

// Deletes a photo identified by the param id
server.delete('gallery/:id', function(req,res) {
  res.send('Delete stuff here');
});

// expresses version of setting up a new server
var app = server.listen(3000, function() {
  var host = app.address().address;
  var port = app.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});