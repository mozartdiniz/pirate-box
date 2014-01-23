var request = require('request');

module.exports = {

	setServerAddress: function (address) {
		this.address = address;
	},
	setUserAndPassword: function (user, password) {
		this.user = user;
		this.password = password;
	},
	xTransmissionSessionId: '',
	authenticate: function () {
		request.get(this.address).auth(this.password, this.password, false);
	},
	getSessionId: function (error, response, body) {
	
		this.xTransmissionSessionId = response.headers['x-transmission-session-id'];
		
		console.log ('xTransmissionSessionId: ' + this.xTransmissionSessionId);
		
		request({
		    url: host + '/transmission/rpc',
			method: 'POST',
			json: {method: "session-get"},
			headers: {
			        'X-Transmission-Session-Id': this.xTransmissionSessionId
			    },
			auth: {
			    user: this.user,
			    pass: this.password,
			    sendImmediately: true
			  }
		}, getStatus);
	},

	getStatus: function (error, response, body) {
		console.log (body);
	}



}