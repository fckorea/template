var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Authentication = require('./authentication');

exports.setup = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());
	
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true // for req.connection.remoteAddress
	}, function(req, email, password, done) {
		if(email === 'admin' && password === 'admin12#') {
			return done(null, {
				name: 'admin',
				email: email
			});
		} else {
			return done(null, false, { message: 'Unauthorized' });
		}
	}));
};