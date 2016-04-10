var mongoose = require('mongoose');
// var documents = require('../modules/documents');
var Schema = mongoose.Schema;

var users=new Schema({
		
		username: {type: String, required: true, unique: true},
		password: {type: String, required: true, select:false},
		email: {type: String, required: true, unique: true}
});
module.exports = mongoose.model("Users", users);