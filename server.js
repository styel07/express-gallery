var express = require('express');
var server = express();
var db = require('./models');
var Post = db.Posts;
var User = db.user;
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Tell Express which Template engine we are using by NPM module name
server.set('view engine', 'jade');

// Tell Express where our template files live
server.set('views', './views');

server.use(express.static('./public'));

server.use(session(
  {
    secret : 'faceroll lkadj;flkjsk;fdj',
    resave : false,
    saveUninitialized : true
  }
));

//File path: {{project_directory}}/routes/users.js
server.use(bodyParser.urlencoded({
  extended : true
}));

server.use(passport.initialize());

server.use(bodyParser.json());

// this has to be after the body parser
server.use(passport.session());

// to store and recieves sessions serialize is run
passport.serializeUser(function(user, done) {

  console.log('serializng');

  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserialize');

  User.findById(id)
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      done(err, null);
    });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ where : { username : username } })
      .then(function (user) {
        if (!user) {
          console.log('error not user');
          return done(null, false, { message : 'Incorrect username.' });
        }
        if (user.password !== password) {
          console.log('error not password', password, user.password);
          return done(null, false, { message : 'Incorrect password.' });
        }
        console.log('passed');
        return done(null, user);
      })
      .error(function(err) {
        return done(err);
      })
    ;
  }
));

// once users are authenticated it can continue to route
server.get('/secret', ensureAuthenticated, function(req, res) {
  res.send('secret');
});

function ensureAuthenticated(req, res, next) {
  //console.log('req.user', req.user);
  console.log('req.session', req.session);
  //console.log(req.isAuthenticated());
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

server.use('/login', require('./lib/auth'));

// Gets all posts in gallery
server.get('/', function(req, res) {
  console.log('index: ', req.user);
  Post.findAll()
  .then(function(postItem) {
    res.render('index', {
      postItem : postItem,
      user : req.user
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
  Post.create({
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
  Post.findOne({ where : { id : req.params.id }
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
});

// // you can update a gallery photo identified by the :id param
// server.put('/gallery/:id', function(req,res) {
//   res.send('You can update a photo here!');
// });


// // Deletes a photo identified by the param id
// server.delete('gallery/:id', function(req,res) {
//   res.send('Delete stuff here');
// });
server.get('/gallery/:id/', function(req, res) {
// server.use('/gallery/delete', methodOverride(function(req, res){
  // if (req.body && typeof req.body === 'object' && '_method' in req.body) {
  //   // look in urlencoded POST bodies and delete it
  //   var method = req.body._method;
  //   delete req.body._method;
  //   res.render('deleteForm');
  //   return method;
  // }
// }));
    res.render('deleteForm');
});

// expresses version of setting up a new server
var app = server.listen(3000, function() {
  var host = app.address().address;
  var port = app.address().port;
  db.sequelize.sync();
  //db.sequelize.sync({force : true});
  console.log('Example app listening at http://%s:%s', host, port);
});