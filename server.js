var express = require('express');
var server = express();
var db = require('./models');
var gallery = db.Gallery;
var post = db.Posts;
var bodyParser = require('body-parser');
var passport = require('./server/passport.js');

// Tell Express which Template engine we are using by NPM module name
server.set('view engine', 'jade');

// Tell Express where our template files live
server.set('views', './views');

server.use(express.static('./public'));

//File path: {{project_directory}}/routes/users.js
server.use(bodyParser.json());

server.use(bodyParser.urlencoded({
  extended : true
}));

server.use('/login' , passport);

// Gets all posts in gallery
server.get('/', function(req, res) {
  //console.log(db);
  post.findAll()
  .then(function(postItem) {
    res.render('index', {
      postItem : postItem
    });
  });
  // .catch(function(err) {
  //   console.log(err);
  // });
});

// Creates a new post
server.post('/', function(req, res) {
  // res.render('index');
  User.findAll()
    .then(function (posts) {
      res.json(posts);
    });
});

// user wants to create a new gallery photo
server.post('/gallery', function(req, res) {
  console.log(req.body);
  post.create({
    author : req.body.author,
    url : req.body.url,
    description : req.body.description
  })
  .then(function(post) {
    res.redirect('/');
  });
});

//res.json(post);

// This page displays a form that the user can upload a new photo
server.get('/gallery/new', function(req,res) {
  res.render('addForm');
});

// This page displace a single photo in the gallery
server.get('/gallery/:id', function(req, res) {
  post.findOne({ where : { id : req.params.id }
  })
  .then(function (post) {
    console.log('this is the post ', post);
    res.render('picture-detail', {
      singlePost : post
    });
  });
});

// gets a page where you can edit the photo selected in the id: param
server.get('/gallery/:id/edit', function(req, res) {
  res.send('edit photos here!');
});~

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
  db.sequelize.sync();
  console.log('Example app listening at http://%s:%s', host, port);
});