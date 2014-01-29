var finder = require("./torrentfinder");

var mediaOptions = {};

var terms = new Array();
terms[0] = "Arrow";
terms[1] = "S01E03";

var contains = new Array();
contains[0] = "720p";

mediaOptions.terms = terms;
mediaOptions.contains = contains;

mediaOptions.doNotContain = new Array();

var callbackFunctionWithBestMatch = function(chosenItem) {
	console.log(" -- :) -- Chosen Item: " + JSON.stringify(chosenItem, null, 4));
};

console.log("Requesting...");
finder.FindBestMatch(mediaOptions, callbackFunctionWithBestMatch);


// var callbackFunctionWithTheResults = function(resultsArray){
// 	console.log(resultsArray);
// };

// App.Torrent.Search(terms, null, null, callbackFunctionWithTheResults);
