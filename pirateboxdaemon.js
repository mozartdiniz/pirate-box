var Datastore = require('nedb');
var finder = require("./torrentfinder");

var db = {};
db.config = new Datastore({ filename: 'db/configuration.pbox', autoload: true });
db.subscription = new Datastore({ filename: 'db/subscription.pbox', autoload: true });
db.download = new Datastore({ filename: 'db/download.pbox', autoload: true });

var prepareTerms = function() {

};

var update = function(){
	db.subscription.find({}, function(err, docs){
  		docs.forEach(function(entry) {

  			var mediaOptions = {};
  			mediaOptions.terms = new Array();

  			entry.options.forEach(function(option){
  				mediaOptions.terms.push(option.value);
  			});

  			var callbackFunctionWithBestMatch = function(chosenItem) {
				console.log("Chosen Item: " + JSON.stringify(chosenItem, null, 4));
			};
    		finder.FindBestMatch(mediaOptions, callbackFunctionWithBestMatch);
  		});
	});
};

var interval = setInterval(function(){
	update();
}, 15000);