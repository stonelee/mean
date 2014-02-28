'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  var ArticleSchema = mongoose.Schema({
    title: String,
    tags: [String]
  });
  var Article = mongoose.model('Article', ArticleSchema);

  Article.remove(function() {
    var article = new Article({
      title: 'my js and css',
      tags: ['js', 'css']
    });

    article.save(function(err, article) {
      //console.log(article);
      var article = new Article({
        title: 'my angular',
        tags: ['js', 'angular']
      });

      article.save(function(err, article) {
        //console.log(article);

        Article.find({tags:'js'}).exec(function(err,articles) {
          console.log(articles);
        })
        //Article.distinct('tags').exec(function(err,articles) {
          //console.log(articles);
        //});

      });

    });
  });

});
