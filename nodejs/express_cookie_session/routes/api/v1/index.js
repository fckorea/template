module.exports = function(app) {
  app.use('/api/v1/admin', require('./admin'));
  app.use('/api/v1/user', require('./user'));
}