var express = require('express');
var router = express.Router();
var shoplocations = require('../models/shoplocations');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*router.post('/shops',function(req,res,next){
	var query = shoplocations.findOne( { 
		'name': req.body.name
	});
	console.log(req.body);
	console.log(req.body.name);
	query.exec(function(err,shop){
		if(err) {
			res.json(err);
		} else {
			if(shop) {
				res.json(shop);
			} else {
				res.json({"message" : "no shop with this name"});
			}
		}
	});
});*/
router.post('/category',function(req,res,next){
	var query = shoplocations.find({},{'_id':0,'category':1});
	/*console.log(req.body);
	//console.log(req.body.);*/
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
});

router.post('/nearbyshops/:category',function(req,res,next){
	console.log(req.body);
	console.log(req.params.category);
	var query = shoplocations.find({'loc': {$near:[req.body.lat,req.body.lon]}});

	query.exec(function(err,nearshop){
		if(err) {
			res.json(err);
		} else {
			if(nearshop) {
				res.json(nearshop);
			} else {
				res.json({"message" : "no shop with this name"});
			}
		}	
	});
});

/*router.post('/OnlyShopLocations',function(req,res,next){
	var query = shoplocations.find({},{'loc.lon':1,'loc.lat':1});
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
})*/

module.exports = router;