
/*
 * GET users listing.
 */
var utils = require("../utils");
var mongoose = require("mongoose");
var SecretQuestion = mongoose.model("SecretQuestion");
var SecretAnswer = mongoose.model("SecretAnswer");

exports.index = function(req, res){
	var user_id = req.cookies ? req.cookies.user_id : undefined;
	SecretAnswer.find({ user_id: user_id }).sort("-updated_at").exec( function( err, sa, count ){
		
		if( err ) 
			return next(err);
		res.render( "secretanswer_index", {
			title: "List of your Secret Answers",
			sa: sa,
			layout: "layout.ejs",
		});
	});
	
};

exports.create = {};

exports.create.get = function( req, res) {
	var user_id = req.cookies ? req.cookies.user_id : undefined;
	if( req.params.id )
	{
		// Nothing is happening here, i suppose.
		var q_id;
		SecretQuestion.findById(req.params.id, function (err, sq) {
			q_id = sq;
		});
	}
	
	//SecretAnswer.find({ user_id: user_id, question_id: q_id }).sort("-updated_at").exec( function( err, sa, count ){
	SecretAnswer.find({ user_id: user_id }).sort("-updated_at").exec( function( err, sa, count ){
		//console.log("sa");
		//console.log(sa);
		//console.log(sa[0].question_id[0]._id);
		if( err )
			return next(err);
		res.render( "secretanswer_create_form", {
			title: "Create a Secret Answer for the question",
			id: req.params.id,
			sa: sa,
			layout: "layout.ejs",
		});
	});
	
};

exports.create.post = function( req, res, next) {
	
	//var Sq;
	//Sq = SecretQuestion.find({_id: req.params.id});
	
	new SecretAnswer({
		user_id: req.cookies.user_id,
		question_id: req.params.id,
		/* question_id: Sq, */
		answer: req.body.content,
		updated_at: Date.now(),
		created_at: Date.now(),
	})
	.save( function(err, todo, count) {
		if( err )
		{
			return next(err);
		}
		res.redirect("/secretquestion");
	})
	;
	
};



