var mongoose = require('mongoose');
// var documents = require('../modules/documents');
var Schema = mongoose.Schema;

var OnlyShopLocations=new Schema({
		location :
		{
			lon: {type: Number, required: true, select:true},
			lat: {type: Number, required: true, unique: false}
		}
});
module.exports = mongoose.model("onlyshoplocations", OnlyShopLocations);