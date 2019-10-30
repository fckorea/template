module.exports = function(userInfo) {
	try {
		if(userInfo.privilege === 'admin' || userInfo.name !== undefined) {
			return {
				result: true
			};
		} else {
			return {
				result: false
			};
		}
	} catch(err) {
		return {
			result: false,
			data: err
		}
	}
}