var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.sqlite');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS subscription (id INTEGER PRIMARY KEY, description TEXT);");

  db.run("CREATE TABLE IF NOT EXISTS subscriptionterms (id INTEGER PRIMARY KEY,	subscriptionid INTEGER,	FOREIGN KEY(subscriptionid) REFERENCES subscription(id))");

  // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  // for (var i = 0; i < 10; i++) {
  //     stmt.run("Ipsum " + i);
  // }
  // stmt.finalize();

  // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
  //     console.log(row.id + ": " + row.info);
  // });
});

db.close();