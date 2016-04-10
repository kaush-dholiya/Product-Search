var mongoose = require('mongoose');
// var documents = require('../modules/documents');
var Schema = mongoose.Schema;

var shoplocations=new Schema({
		
		shopname: {type: String, required: true, unique: false},
		category: {type: String, required: true, unique: false},
		location :
		{
			lon: {type: Number, required: true, select:true},
			lat: {type: Number, required: true, unique: false}
		}
});
module.exports = mongoose.model("shops", shoplocations);