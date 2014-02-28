'use strict';

var mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  _ = require('lodash');


exports.article = function(req, res, next, id) {
  Article.load(id, function(err, article) {
    if (err) return next(err);
    if (!article) return next(new Error('Failed to load article ' + id));
    req.article = article;
    next();
  });
};


exports.create = function(req, res) {
  var article = new Article(req.body);
  article.user = req.user;

  article.save(function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        article: article
      });
    } else {
      res.jsonp(article);
    }
  });
};


exports.update = function(req, res) {
  var article = req.article;

  article = _.extend(article, req.body);

  article.save(function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        article: article
      });
    } else {
      res.jsonp(article);
    }
  });
};


exports.destroy = function(req, res) {
  var article = req.article;

  article.remove(function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        article: article
      });
    } else {
      res.jsonp(article);
    }
  });
};


exports.show = function(req, res) {
  res.jsonp(req.article);
};


exports.all = function(req, res, next) {
  var userId = req.query.userid;

  var filter = {};
  if (userId) {
    filter = {
      user: userId
    };
  }
  Article.find(filter).sort('-created').populate('user', 'name username').exec(function(err, articles) {
    if (err) return next(err);
    res.jsonp(articles);
  });
};


exports.my = function(req, res, next) {
  Article.find({
    user: req.user
  }).sort('-created').exec(function(err, articles) {
    if (err) return next(err);
    res.jsonp(articles);
  });
};


exports.hot = function(req, res, next) {
  Article.find({
    user: req.user
  }).sort('-created').exec(function(err, articles) {
    if (err) return next(err);
    res.jsonp(articles);
  });
};


/*
 * tags
 */

exports.tags = function(req, res, next) {
  var userId = req.query.userid;

  var filter = {};
  if (userId) {
    filter = {
      user: userId
    };
  }
  Article.find(filter).distinct('tags').exec(function(err, tags) {
    if (err) return next(err);
    res.jsonp(tags);
  });
};


exports.listByTag = function(req, res, next) {
  var tag = req.params.tag;
  var filter = {
    tags: tag
  };

  var userId = req.query.userid;
  if (userId) {
    _.extend(filter, {
      user: userId
    });
  }
  Article.find(filter).sort('-created').populate('user', 'name username').exec(function(err, articles) {
    if (err) return next(err);
    res.jsonp(articles);
  });
};
