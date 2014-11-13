
/*
 * GET users listing.
 */
var utils = require("../utils");
var mongoose = require("mongoose");


var UserProfile = mongoose.model("UserProfile");

//Version 1 (Check routelist file, for reference)
exports.list = function(req, res){
	res.send("respond with a resource");
};

// Version 2 (Check routelist file, for reference)
//module.exports = function(req, res){
	//res.send("respond with a resource");
//};


exports.u = function(req, res){
	res.send("hi");
	
};


