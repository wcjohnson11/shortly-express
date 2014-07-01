var db = require('../config');
var User = require('../models/user');

var Users = new db.Collection({
	tablename: 'users'
});

Users.model = User;

module.exports = Users;
