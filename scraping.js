var request = require('request');
var cheerio = require('cheerio');
var provider = require('./providers/piratebay');

var pirateBayUrl = "http://thepiratebay.org";
var App = App || {};
App.Torrent = App.Torrent || {};

App.Torrent.Search = function(searchTerms, contains, doNotContains, callbackFunction) {
	if (searchTerms === 'undefined') {
		console.log("Invalid searchTerms!");
		return;
	}

	var requestUrl = pirateBayUrl + "/search/",
	first = true;

	searchTerms.forEach(function(entry){
		if (first) {
			requestUrl += entry;
			first = false;
		} else {
			requestUrl += "%20" + entry;
		}
		
	});

	requestUrl += "/0/7/0";

	console.log("Requesting for: " + requestUrl);

	var requestOptions = {
	    url: requestUrl,
	    headers: {
	        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36'
	    }
	};

	request(requestOptions, function(err, resp, body) {
		if (err) {
			throw err;
		}
		if (!err && resp.statusCode == 200) {

			console.log("Request Ok! Scraping...");

			var results = provider.parseResult(body);

			callbackFunction(results);

		} else {
			console.log("Something wrong happened... :(");
		}
		
	});

};

// Test!

console.log("Requesting...");

var terms = new Array();
terms[0] = "Arrow";
terms[1] = "S01E03";

var callbackFunctionWithTheResults = function(resultsArray){
	console.log(resultsArray);
};

App.Torrent.Search(terms, null, null, callbackFunctionWithTheResults);
