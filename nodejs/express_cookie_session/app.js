let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let cors = require('cors');
let robots = require('express-robots-txt');
let passport = require('./util/passport');

let app = express();

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

// Set robots
app.use(robots(path.join(__dirname, 'robots.txt')));

passport.setup(app);

app.use(express.static(path.join(__dirname, 'public')));

require('./routes/api/v1')(app);
require('./routes/api/v2')(app);

// for react or angular router
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(function(req, res, next) {
	res.status(404).send('Something Broke!!!');
	// res.redirect('/');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

module.exports = app;
