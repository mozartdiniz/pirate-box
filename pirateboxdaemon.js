var Datastore = require('nedb');
var finder = require("./torrentfinder");

var DEBUG = false;

var db = {};
db.config = new Datastore({
  filename: 'db/configuration.pbox',
  autoload: true
});
db.subscription = new Datastore({
  filename: 'db/subscription.pbox',
  autoload: true
});
db.download = new Datastore({
  filename: 'db/download.pbox',
  autoload: true
});

var prepareTerms = function() {};

var loadDatabases = function() {
  db.config.loadDatabase();
  db.subscription.loadDatabase();
  db.download.loadDatabase();
};

var update = function() {
  loadDatabases();
  db.subscription.find({}, function(err, docs) {
    docs.forEach(function(entry) {

      var mediaOptions = {};
      mediaOptions.terms = new Array();

      entry.options.forEach(function(option) {
        mediaOptions.terms.push(option.value);
      });

      var callbackFunctionWithBestMatch = function(chosenItem) {
        console.log("Chosen Item: " + JSON.stringify(chosenItem, null, 4));
      };
      finder.FindBestMatch(mediaOptions, callbackFunctionWithBestMatch);
    });
  });
};


var getEspisodeRegexPattern = function() {
  var configDB = new Datastore({
    filename: 'db/configuration.pbox',
    autoload: true
  });

  var defaultEpisodeTemplate;
  var regexPattern;

  configDB.find({}, function(err, docs) {
    console.log(JSON.stringify(docs, null, 4));
    if (docs !== undefined && docs !== null && docs.length > 0) {
      docs.forEach(function(entry) {
        defaultEpisodeTemplate = entry.defaultepisodetemplate;
      });
    } else {
      defaultEpisodeTemplate = "S%SEASON%E%EPISODE%";
    }
    regexPattern = defaultEpisodeTemplate.replace("%SEASON%", "\\d");
    regexPattern = regexPattern.replace("%EPISODE%", "\\d");
    DEBUG && console.log('regex: ' + regexPattern);
  });

  // This is how we may get the episodeRegexPattern.
};

var interval = setInterval(function() {
  update();
}, 10000);