var express = require('express');
var router = express.Router();

/* POST Login. */
router.post('/login', function(req, res, next) {
  res.status(200).json({
    status: 200,
    message: 'Admin Login OK (v2)',
  });
});

/* GET Logout. */
router.get('/logout', function(req, res, next) {
  res.status(200).json({
    status: 200,
    message: 'Admin Logout OK (v2)',
  });
});

module.exports = router;