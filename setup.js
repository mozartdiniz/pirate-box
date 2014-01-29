console.log("Starting setup...");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.sqlite');

console.log("Creating database...");

db.serialize(function() {

  console.log("Creating configuration table...");
  db.run("CREATE TABLE IF NOT EXISTS configuration (id INTEGER PRIMARY KEY, defaultepisodetemplate TEXT)");

  console.log("Creating subscription table...");
  db.run("CREATE TABLE IF NOT EXISTS subscription (id INTEGER PRIMARY KEY, description TEXT, episodenumbertemplate TEXT, latestcheck TEXT)");

  console.log("Creating subscriptionoption table...");
  //id, subscriptionid, value, type (e.g. 1, 1, arrow, TERM) (types: TERM, CONTAINS, NOT_CONTAINS)
  db.run("CREATE TABLE IF NOT EXISTS subscriptionoption (id INTEGER PRIMARY KEY, subscriptionid INTEGER,	value TEXT, type TEXT, FOREIGN KEY(subscriptionid) REFERENCES subscription(id))");


  console.log("Creating downloadedepisode table...");
  db.run("CREATE TABLE IF NOT EXISTS downloadedepisode (id INTEGER PRIMARY KEY, subscriptionid INTEGER, name TEXT, season TEXT, episode TEXT, date TEXT)");

  console.log("Inserting default values...");
  db.run("INSERT INTO configuration VALUES(1, 'S%SEASON%E%EPISODE%')");

  console.log("Inserting sample data...");
  var lastID;
  db.run("INSERT INTO subscription (description) VALUES('Arrow - Seriado do Flecha la')",
    function(err) {
      if (!err) {
        console.log(this);
        lastID = this.lastID;
      } else {
        console.log("1Error inserting sample data. Err: " + err);
      }    
    }
  );

  db.run("INSERT INTO subscriptionoption (subscriptionid,value,type) VALUES($subscriptionid,$value,$type)",
    {$id:lastID,$value:'arrow',$type:'TERM'},
    function(err2){
    if (!err2) {
      console.log("Sample data inserted");
    } else {
      console.log("2Error inserting sample data. Err: " + err2);
    }
  });

  // stmt = db.prepare("INSERT INTO subscriptionoption (description) VALUES(?)");
  // stmt.run();

});

db.close();

console.log("Setup finished.");