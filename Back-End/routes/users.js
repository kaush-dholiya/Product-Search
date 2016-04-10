var express = require('express');
var router = express.Router();
var users=require('../models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login',function(req,res,next){
	var query = users.findOne( { 
		'username': req.body.username,
		'password': req.body.password
	});
	console.log(req.body);

	query.exec(function(err,user){
		if(err) {
			res.json(err);
		} else {
			if(user) {
				res.json(user);
			} else {
				res.json({"message" : "Wrong username and password"});
			}
		}
	});
});


router.post('/register',function(req,res,next){
	
	var new_user = new users(req.body);
	new_user.save(function(err,user) {
		if(err) {
			res.json(err);
		} else {
			res.json(user);
		}
	});

});

module.exports = router;
