var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var link = require('./link');
var crypto = require('crypto');

var User = db.Model.extend({
	tablename: 'users',
	hasTimestamps: true,
	links: function() {
      return this.hasMany(Link);
	},

	initialize: function(){
    this.on('creating', function(model, attrs, options){
      bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(model.get('password'), salt, function(err, hash) {
          model.set('salt', salt);
          model.set('password', hash);
		});
      });
    });
	}
});

module.exports = User;