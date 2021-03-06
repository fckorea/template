var express = require('express');
var router = express.Router();

/* POST Login. */
router.post('/login', function(req, res, next) {
  res.status(200).json({
    status: 200,
    message: 'User Login OK (v1)',
  });
});

/* GET Logout. */
router.get('/logout', function(req, res, next) {
  res.status(200).json({
    status: 200,
    message: 'User Logout OK (v1)',
  });
});

module.exports = router;