
/*
 * GET home page.
 */

// var utils = require("../../utils");
var mongoose = require("mongoose");

// All API functionality files you want to include
// you can do it here
// in the index file
exports.api_keyspass = require("./keyspass");
// exports.api_







var Todo = mongoose.model("Todo");

exports.index = function(req, res){
	var user_id = req.cookies ? req.cookies.user_id : undefined;
	
	Todo.find({ user_id: user_id }).sort("-updated_at").exec( function( err, todos, count ){
		//console.log( todos );
		if( err ) 
			return next(err);
		res.render( "index", {
			title: "Express Todo Example",
			todos: todos,
			layout: "layout.ejs",
		});
	});
	
};

exports.create = function( req, res) {
	new Todo({
		user_id: req.cookies.user_id,
		content: req.body.content,
		updated_at: Date.now(),
	})
	.save( function(err, todo, count) {
		if( err )
			return next(err);
		res.redirect("/");
	});
};

exports.destroy = function(req, res ){
	Todo.findById(  req.params.id, function(err, todo) {
		var user_id = req.cookies ? req.cookies.user_id : undefined;
		if( todo.user_id != req.cookies.user_id )
			return utils.forbidden(res);
		todo.remove( function ( err, todo) {
			if( err )
				return next(err);
			res.redirect("/");
		});
	});
};

exports.edit = function( req, res) {
	var user = req.cookies ? req.cookies.user_id : undefined;
	Todo.find().sort("-updated_at").exec( function( err, todos) {
		if( err )
			return next(err);
		res.render( "edit", {
			title: "Express Todo Example",
			todos: todos,
			current: req.params.id
		});
	});
};

exports.update = function(req, res){
	Todo.findById( req.params.id, function( err, todo ) {
		var user_id = req.cookies ? req.cookies.user_id : undefined;
		if( todo.user_id !== user_id )
			return utils.forbidden( res );
		todo.content = req.body.content;
		todo.updated_at = Date.now();
		todo.save ( function ( err, todo, count) {
			if( err )
				return next(err);
			res.redirect("/");
		});
	});
};

// Express turns the cookie into lowercase
exports.current_user = function(req, res, next) {
	var user_id = req.cookies ? req.cookies.user_id : undefined;
	if( !user_id )
		res.cookie( "user_id", utils.uid(32) );
	next();
};

