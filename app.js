
/**
 * Module dependencies.
 */
require("./db");

// var my = require('mysql');

var express = require('express');
// Keeping `routes` Global
routes = require('./routes');

var sources = '/routes';
user = require('.'+sources+'/user');
secretquestion = require("."+sources+"/secretquestion");
secretanswer = require("."+sources+"/secretanswer");
keyspass = require("."+sources+"/keyspass");

var http = require('http');
var path = require('path');

// Keeping `app` Global
app = express();

var engine = require("ejs-locals");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// require routeList
require("./routelist");

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});



