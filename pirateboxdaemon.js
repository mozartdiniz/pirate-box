var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.sqlite');

db.serialize(function() {
	db.each("SELECT * FROM configuration", function(err, row) {
		console.log(JSON.stringify(row, null, 4));
	});
});

db.close();

db = new sqlite3.Database('database.sqlite');

db.serialize(function() {
	db.each("SELECT * FROM configuration", function(err, row) {
		console.log(JSON.stringify(row, null, 4));
	});
});

db.close();