var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors');
var passport = require('./util/passport');

var app = express();

app.use(session({
	key: 'xkey',
	secret: 'xsecret',
	cookie: {
		maxAge: 1000 * 60 * 60
	}
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

passport.setup(app);

app.use(express.static(path.join(__dirname, 'public')));

require('./routes/api/v1')(app);
require('./routes/api/v2')(app);

app.use(function(req, res, next) {
	res.status(404).send('Something Broke!!!');
	// res.redirect('/');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

module.exports = app;
