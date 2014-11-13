
/*
 * GET users listing.
 */
var utils = require("../utils");
var mongoose = require("mongoose");
var SecretQuestion = mongoose.model("SecretQuestion");

exports.index = function(req, res){
	var user_id = req.cookies ? req.cookies.user_id : undefined;
	SecretQuestion.find({ user_id: user_id }).sort("-updated_at").exec( function( err, sq, count ){
		if( err ) 
			return next(err);
		res.render( "secretquestion_index", {
			title: "Add a Secret Question",
			sq: sq,
			layout: "layout.ejs",
		});
	});
};

exports.create = function( req, res) {
	new SecretQuestion({
		user_id: req.cookies.user_id,
		question: req.body.content,
		updated_at: Date.now(),
		created_at: Date.now(),
	})
	.save( function(err, todo, count) {
		if( err )
			return next(err);
		res.redirect("/secretquestion");
	});
};

exports.destroy = function(req, res ){
	SecretQuestion.findById(  req.params.id, function(err, todo) {
		var user_id = req.cookies ? req.cookies.user_id : undefined;
		if( todo.user_id != req.cookies.user_id )
			return utils.forbidden(res);
		todo.remove( function ( err, todo) {
			if( err )
				return next(err);
			res.redirect("/secretquestion");
		});
	});
};


