var express = require('express');
var Router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// you can store sessions in 3 ways
// file based -> on server /tmp/session_id
// memory
// database -> store it using redis <---- in memory
// -> stores it into key value pairs which you can access any database

Router.post('/',
  passport.authenticate('local', {
    successRedirect : '/',  // if authentication pass it sends you to secret
    failureReirect : '/login',    // if authentication fails it sends you to login and flashes error
    failureFlash : true, info : 'WRONG!@!!!!!' })
);

Router.get('/', function(req,res) {
  // console.log('hello!');
  res.render('login');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// var User = {
//   findOne : function(opts, cb) {
//     var user = {
//       id : 2,
//       username : opts.username,
//       password : 'my secret password',
//       validPassword : function (password) {
//         return (password === 'my secret password');
//       }
//     };
//     cb(null, user);
//   }
// };

module.exports = Router;
