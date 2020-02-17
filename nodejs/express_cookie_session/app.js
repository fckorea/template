let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let rateLimit = require("express-rate-limit");
let cors = require('cors');
let robots = require('express-robots-txt');
let passport = require('./util/passport');

let limiter = rateLimit({
  windowMs: 1 * 1000, // 1sec
  max: 10, // limit each API key to 10 requests per windowMs
  keyGenerator: function(req) {
    return req.query.key;
  },
});

let app = express();

app.use(session({
  key: 'xkey',
  secret: 'xsecret',
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));

if(process.env.NODE_ENV === 'prod') {
  app.use(logger());
} else {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

// Set robots
app.use(robots(path.join(__dirname, 'robots.txt')));

passport.setup(app);

app.use(express.static(path.join(__dirname, 'public')));

require('./routes/api/v1')(app, limiter);
require('./routes/api/v2')(app, limiter);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// for react or angular router
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(function(req, res, next) {
  res.status(404).send('Something Broke!!!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
