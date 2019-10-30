module.exports = function(app) {
  app.use('/api/v2/admin', require('./admin'));
  app.use('/api/v2/user', require('./user'));
}