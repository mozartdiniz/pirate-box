var Datastore = require('nedb');

console.log("Initializing databases...");

var db = {};
db.config = new Datastore({ filename: 'db/configuration.pbox', autoload: true });
db.subscription = new Datastore({ filename: 'db/subscription.pbox', autoload: true });
db.download = new Datastore({ filename: 'db/download.pbox', autoload: true });


db.config.remove({},{multi:true}, function(err, numRemoved){});

var config = {defaultepisodetemplate:'S%SEASON%E%EPISODE%'};

db.config.insert(config);

db.config.find({}, function(err, docs){
  docs.forEach(function(entry) {
    console.log(JSON.stringify(entry, null, 4));
  });
});

//Sample data
db.subscription.remove({},{multi:true}, function(err, numRemoved){});
db.subscription.insert({description: "Arrow", options:[{value:"Arrow",type:"TERM"}, {value:"720p", type:"TERM"}]});

console.log("DB initialization done.");