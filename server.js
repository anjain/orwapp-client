// server.js (Express 4.0)
var express        = require('express');
var session        = require('express-session');	
var expValidator   = require('express-validator');	
var passport       = require('passport');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var connectFlash   = require('connect-flash');
var app            = express();

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(expValidator()); 
app.use(methodOverride()); 					// simulate DELETE and PUT


var router = express.Router(); 				// get an instance of the express Router

/*var mongoose   = require('mongoose');
var config   = require('./config/config');

mongoose.connect(config.database.url); 
console.log('Mongo Connected');
*/
app.listen(process.env.PORT || 8000)
console.log('Magic happens on port:'+ process.env.PORT); 			// shoutout to the user

