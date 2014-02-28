'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: [Date],
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: String,
    trim: true
  }]
});


ArticleSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Article', ArticleSchema);
