var request = require('request');
var cheerio = require('cheerio');
var provider = require('./providers/piratebay');
var Datastore = require('nedb');

var DEBUG = true;

var pirateBayUrl = "http://thepiratebay.org";
var App = App || {};
App.TorrentFinder = App.TorrentFinder || {};

var stringContains = function(string, substring) {
	return (string.indexOf(substring) !== -1);
};

App.TorrentFinder.Search = function(searchTerms, callbackFunction) {
	if (searchTerms === 'undefined') {
		console.log("Invalid searchTerms!");
		return;
	}

	var requestUrl = pirateBayUrl + "/search/",
		first = true;

	searchTerms.forEach(function(entry) {
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

	DEBUG && console.log("Doing the scraping...");

	request(requestOptions, function(err, resp, body) {
		if (err) {
			throw err;
		}
		if (!err && resp.statusCode == 200) {

			console.log("Request Ok! Scraping...");

			var results = provider.parseResult(body);

			DEBUG && console.log("Calling callbackFunction...");
			callbackFunction(results);

		} else {
			console.log("Something wrong happened... :(");
		}

	});

};

App.TorrentFinder.FindBestMatch = function(mediaOptions, callback) {

	console.log("Finding best match for " + JSON.stringify(mediaOptions, null, 4));

	if (mediaOptions === undefined) {
		console.log("undefined options!");
		return;
	}

	var callbackFunction = function(resultArray) {

		// TODO: Create a score search

		console.log("Results found: " + resultArray.length);

		var chosenItem;

		var length = resultArray.length;
		for (var w = 0; w < length; w++) {
			var item = resultArray[w];

			DEBUG && console.log("Analysing item: " + JSON.stringify(item, null, 4));

			var itemContainsAll = true;
			var itemDoNotContainsAll = true;
			if (mediaOptions.contains !== undefined) {
				for (var j = mediaOptions.contains.length - 1; j >= 0; j--) {
					if (!stringContains(item.name, mediaOptions.contains[j])) {
						itemContainsAll = false;
					}
				}
			}
			if (mediaOptions.doNotContain !== undefined) {
				for (var k = mediaOptions.doNotContain.length - 1; k >= 0; k--) {
					if (stringContains(item.name, mediaOptions.doNotContain[k])) {
						itemDoNotContainsAll = false;
					}
				}
			}

			if (itemContainsAll === true && itemDoNotContainsAll === true) {
				chosenItem = item;
				break;
			}
		}

		DEBUG && console.log("Chosen Item: " + JSON.stringify(chosenItem, null, 4));
		callback(chosenItem);

	};

	App.TorrentFinder.Search(mediaOptions.terms, callbackFunction);

};

App.TorrentFinder.IdentifyTerms = function(string, episodeRegexPattern) {
	episodeRegexPattern = "S\\d+E\\d+(\\z|$)";
	DEBUG && console.log("Identifying terms for: " + string + " regex pattern: " + episodeRegexPattern);
	if (string !== undefined) {
		var array = string.split(".");
		var terms = new Array();
		array.forEach(function(entry) {
			if (!entry.match(episodeRegexPattern)) {
				terms.push(entry);
			}
		});
		return terms;
	} else {
		DEBUG && console.log("String was undefined");
		return null;
	}
};

module.exports = App.TorrentFinder;