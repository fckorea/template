module.exports = function(app, limiter) {
  app.use('/api/v1/admin', limiter, require('./admin'));
  app.use('/api/v1/user', limiter, require('./user'));
}