'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.authCallback = function(req, res) {
  res.redirect('/');
};

exports.signin = function(req, res) {
  res.render('users/signin', {
    title: 'Signin',
    message: req.flash('error')
  });
};

exports.signup = function(req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
};

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.session = function(req, res) {
  res.redirect('/');
};

exports.all = function(req, res, next) {
  User.find().exec(function(err, users) {
    if (err) return next(err);
    res.jsonp(users);
  });
};

exports.create = function(req, res, next) {
  var user = new User(req.body);
  var message = null;

  user.provider = 'local';
  user.save(function(err) {
    if (err) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = 'Username already exists';
          break;
        default:
          message = 'Please fill all the required fields';
      }

      return res.render('users/signup', {
        message: message,
        user: user
      });
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/');
    });
  });
};

exports.show = function(req, res) {
  res.jsonp(req.profile);
};

exports.user = function(req, res, next, id) {
  User
    .findOne({
      _id: id
    })
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    });
};
