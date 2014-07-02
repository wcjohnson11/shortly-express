var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var link = require('./link');
var crypto = require('crypto');

var User = db.Model.extend({
	tablename: 'users',
	hasTimestamps: true,
	hasMany: link,

	initialize: function(){
    this.on('creating', this.hashPassword);
	},

	comparePassword: function(attemptedPassword, callback) {
		bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch){
			callback(isMatch);
		});
	},
	hashPassword: function() {
		var cipher = Promise.promisify(bcrypt.hash);

		return cipher(this.get('password'), null, null)
          .bind(this)
          .then(function(hash) {
    	this.set('password', hash);
          });
	}
});

module.exports = User;