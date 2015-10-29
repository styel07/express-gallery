module.exports =  function(app) {

  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());

  // this has to be after the body parser
  app.use(passport.session());

  // to store and recieves sessions serialize is run
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // you can store sessions in 3 ways
  // file based -> on server /tmp/session_id
  // memory
  // database -> store it using redis <---- in memory
  // -> stores it into key value pairs which you can access any database

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username : username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message : 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message : 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  app.post('login',
    passport.authenticate('local', {
      successRedirect : '/secret',  // if authentication pass it sends you to secret
      failureReirect : '/login',    // if authentication fails it sends you to login and flashes error
      failureFlash : true, info : 'WRONG!@!!!!!' })
  );

  // once users are authenticated it can continue to route
  app.get('secret', ensureAuthenticated, function(req, res) {
    res.send('secret');
  });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  }

  var User = {
    findOne : function(opts, cb) {
      var user = {
        id : 2,
        username : opts.username,
        password : 'my secret password',
        validPassword : function (password) {
          return (password === 'my secret password');
        }
      };
      cb(null, user);
    }
  };
};