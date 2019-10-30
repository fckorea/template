var Autorization = require('./authorization');

module.exports = function(req, res, next) {
	try {
		if(req.isAuthenticated() && Autorization(req.user).result) {
			return next();
		} else {
			res.set('Content-Type', 'application/json');
			res.status(200).json({
				status: 401,
				message: 'Unauthorized'
			});
		}
	} catch(err) {
		res.set('Content-Type', 'application/json');
		res.status(200).json({
			status: 401,
			message: 'Unauthorized',
			data: err
		});
	}
}