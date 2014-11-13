var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Todo = new Schema({
	user_id: String,
	content: String,
	updated_at: Date,
});

var UserProfile = new Schema({
	user_id: String,
	userName: String,
	email: String,
	created_at: Date,
	updated_at: Date,
});

var SecretQuestion = new Schema({
	user_id: String,
	question: String,
	created_at: Date,
	updated_at: Date,
});

// FTM
// Atleast 5 secret questions required, out of which 3 will be asked. (or maybe more)
var SecretAnswer = new Schema({
	user_id: String,
	//question_id : [SecretQuestion],
	question_id : {type: mongoose.Schema.Types.ObjectId, ref: 'SecretQuestion'},
	answer: String,
	created_at: Date,
	updated_at: Date,
});

var KeysPass = new Schema({
	user_id: String,
	site: String,
	username: String,
	email: String,
	pass: String,
	created_at: Date,
	updated_at: Date,
});


mongoose.model ('Todo', Todo);
mongoose.model ('UserProfile', UserProfile);
mongoose.model ('SecretQuestion', SecretQuestion);
mongoose.model ('SecretAnswer', SecretAnswer);
mongoose.model ('KeysPass', KeysPass);

conn = mongoose.connect('mongodb://localhost/express-todo');


