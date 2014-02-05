var Datastore = require('nedb');
var finder = require("./torrentfinder");

var DEBUG = true;

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

var stringContains = function(string, substring) {
  return (string.indexOf(substring) !== -1);
};

var generateEpisodeTerm = function(season, episode) {
  var term = "S";
  if (season < 10) {
    term += "0" + season;
  } else {
    term += season;
  }
  term += "E";
  if (episode < 10) {
    term += "0" + episode
  } else {
    term += episode;
  }

  return term;
};

var update = function() {
  loadDatabases();
  db.subscription.find({}, function(err, docs) {
    docs.forEach(function(entry) {

      console.log("Verifying new downloads for subscription: " + JSON.stringify(entry, null, 4));

      var mediaOptions = {};
      mediaOptions.terms = new Array();

      entry.options.forEach(function(option) {
        mediaOptions.terms.push(option.value);
      });

      var lastSeason;
      if (entry.lastSeason === undefined) {
        lastSeason = 1;
      } else {
        lastSeason = entry.lastSeason;
      }

      if (entry.lastEpisode === undefined) {
        lastEpisode = 1;
      } else {
        lastEpisode = entry.lastEpisode;
      }

      var episodeTerm = generateEpisodeTerm(lastSeason, lastEpisode + 1);

      mediaOptions.terms.push(episodeTerm);

      var callbackFunctionWithBestMatch = function(chosenItem) {
        console.log("Chosen Item: " + JSON.stringify(chosenItem, null, 4));

        if (stringContains(chosenItem.name, episodeTerm)) {

          //Download here

          // If download started successfully... Updating downloaded epi
          entry.lastEpisode = lastEpisode + 1;
          entry.lastSeason = lastSeason;

          DEBUG && console.log("Updating subscription [id: " + entry._id + ", description: " + entry.description + "] with : lastSeason: " + lastSeason + "; lastEpisode: " + (lastEpisode + 1));
          db.subscription.update({
            _id: entry._id
          }, entry, {}, function(err, numReplaced) {
              DEBUG && console.log("Update successful. " + numReplaced + " documents were updated.");
          });
        }

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

update();

var interval = setInterval(function() {
  update();
}, 30000);