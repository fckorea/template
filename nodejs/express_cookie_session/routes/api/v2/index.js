module.exports = function(app, limiter) {
  app.use('/api/v2/admin', limiter, require('./admin'));
  app.use('/api/v2/user', limiter, require('./user'));
}