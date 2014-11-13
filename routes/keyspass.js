
/*
 * GET users listing.
 */
var utils = require("../utils");
var mongoose = require("mongoose");

var SecretQuestion = mongoose.model("SecretQuestion");
var SecretAnswer = mongoose.model("SecretAnswer");
var KeysPass = mongoose.model("KeysPass");


// Index List all question
// then check answers
// if all answers are right, then,
// redirect to, the list of all key passes.
exports.index = function(req, res, next){
	var user_id = req.cookies ? req.cookies.user_id : undefined;
	
	// Search SecretAnswers of user_id where question_id = req.questions[id]
	// and check if the value of that answer matches the one in the DB.
	// if all match, then redirect to list_keys_passes.
	// If the SecretAnswer's question_id is equal to the question id sent by the page,
	// then everything is ok, show keyspass.
	//SecretAnswer.find({ user_id: user_id }).sort("-updated_at").exec( function( err, sa, count ){
		//if( err ) 
			//return next(err);
		//
		//res.render( "keyspass_index", {
			//title: "Express SecretQuestion Example",
			//sa: sa,
			//layout: "layout.ejs",
		//});
	//});
	
	//SecretAnswer.find({user_id: user_id }) 
	//.exec(
	//function(err, sa) { 
		//// Your callback code where you can access subdomain directly through custPhone.subdomain.name 
		//
		//console.log("sa");
		//console.log(sa);
		//console.log(sa.question_id);
		//
	//});
	
	SecretQuestion.find({ user_id: user_id }).sort("-updated_at").exec( function( err, sq, count ){
		if( err ) 
			return next(err);
		
		res.render( "keyspass_index", {
			title: "Answer these Secret Questions correctly to see your User/Pass list",
			sq: sq,
			layout: "layout.ejs",
		});
	});
	
	
};

// Method: Check
exports.check = function( req, res) {
	var user_id = req.cookies ? req.cookies.user_id : undefined;
	var ans = req.body.ans;
	
	var question_id_arr = Object.keys(ans);
	
	// Check if answers are right to given questions.
	SecretAnswer.find( {user_id: user_id, question_id: { $in: question_id_arr } }, 'question_id answer', function (err, sa ) {
		var sec_ans = {};
		for ( var i in sa )
		{
			sec_ans[sa[i].question_id] = sa[i].answer;
		}
		var f  = false;
		for (var i in ans ) 
		{
			
			if ( ans[i] == sec_ans[i] )
				f = true;
			else
				f = false;
				
			if ( f == false )
				break;
		}
		
		// if true, then show the Keys & Passes stored, select from KeysPass doc for user_id,
		// i mean redirect to the keyspass /show function
		if (f)
			res.redirect('/keyspass/show/');
		// else if false
		else
			/// sorry wrong answers, redirect to question page
			res.redirect('/keyspass/');
		
	});
	
};


// Show List all keys passes
//list
exports.show = function(req, res, next){
	var user_id = req.cookies ? req.cookies.user_id : undefined;
	
	KeysPass.find( { user_id: user_id }).exec( function( err, kp ){
		
		if( err ) 
			return next(err);
		
		res.render( "keyspass_show", {
			title: "Your user/passes listed below the form",
			kp: kp,
			layout: "layout.ejs",
		});
	});
	
};

// Create Keys Passes
exports.create = function( req, res) {
	
	var user_id = req.cookies ? req.cookies.user_id : undefined;
	
	// See how u can loop
	//for( i in req.body.site )
	//{
		
		new KeysPass({
			user_id: user_id,
			site: req.body.site,
			username: req.body.username,
			email: req.body.email,
			pass: req.body.pass,
			updated_at: Date.now(),
			created_at: Date.now(),
		})
		.save( function(err, kp, count) {
			if( err )
				return next(err);
				
			res.redirect('/keyspass/show/');
		});
		
	//}
	
};

exports.destroy = function(req, res ){
	SecretQuestion.findById(  req.params.id, function(err, todo) {
		var user_id = req.cookies ? req.cookies.user_id : undefined;
		if( todo.user_id != req.cookies.user_id )
			return utils.forbidden(res);
		todo.remove( function ( err, todo) {
			if( err )
				return next(err);
			res.redirect("/keyspass/");
		});
	});
};


