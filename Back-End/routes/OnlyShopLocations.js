var express = require('express');
var router = express.Router();
var shoplocations = require('../models/OnlyShopLocations');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*router.post('/OnlyShopLocations',function(req,res,next){
	var query = OnlyShopLocations.find();
	/*console.log(req.body);
	console.log(req.body.);
	query.exec(function(err,shop){
		if(err) {
			res.json(err);
		} else {
			if(shop) {
				res.json(shop);
			} else {
				res.json({"message" : "no shop with this location"});
			}
		}
	});
});*/

module.exports = router;