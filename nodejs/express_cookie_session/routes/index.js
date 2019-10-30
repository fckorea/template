var express = require('express');
var checkAuthentication = require('../util/authentication');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    status: 200,
    message: 'OK'
  });
});

module.exports = router;
