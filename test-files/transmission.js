var request = require('request');

var host = 'http://192.168.25.20:9091',
	xTransmissionSessionId;
	
request.get(host).auth('pirate', 'coisa', false);

var options = {
    url: host + '/transmission/rpc',
	method: 'POST',
	json: {method: "session-get"},
	headers: {
	        'X-Transmission-Session-Id': xTransmissionSessionId
	    },
	auth: {
	    user: 'pirate',
	    pass: 'coisa',
	    sendImmediately: true
	  }
};

function getStatus (error, response, body) {
	console.log (body);
}

function getSessionId(error, response, body) {
	
	xTransmissionSessionId = response.headers['x-transmission-session-id'];
	
	console.log ('xTransmissionSessionId: ' + xTransmissionSessionId);
	
	request({
	    url: host + '/transmission/rpc',
		method: 'POST',
		json: {method: "session-get"},
		headers: {
		        'X-Transmission-Session-Id': xTransmissionSessionId
		    },
		auth: {
		    user: 'pirate',
		    pass: 'coisa',
		    sendImmediately: true
		  }
	}, getStatus);
}

request(options, getSessionId);