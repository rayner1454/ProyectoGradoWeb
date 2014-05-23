'use strict';

app.factory('User', function() {
	return {
		isAuthenticated: false,
		username: '',
		complete: 0,
		id: 0
	};
});
