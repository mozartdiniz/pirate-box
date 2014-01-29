var sqlite3 = require('sqlite3').verbose();
var db;
// var db = new sqlite3.Database('database.sqlite');

// db.serialize(function() {
// 	db.each("SELECT * FROM configuration", function(err, row) {
// 		console.log(JSON.stringify(row, null, 4));
// 	});
// });

// db.close();

var prepareTerms = function() {

};

var update = function(){
	console.log("Updating...");
	db = new sqlite3.Database('database.sqlite');

	db.serialize(function() {
		db.each("SELECT * FROM subscription", function(err, row) {
			console.log("err: " + err);
			console.log(JSON.stringify(row, null, 4));
			console.log("Updated.");
		}, function(error, rowQuantity) {
			if (error !== null) {
				console.log("Error: " + JSON.stringify(error, null, 4));
			} else {
				console.log(rowQuantity + " series verified.");
			}
		});
	});

	db.close();
};

var interval = setInterval(function(){
	update();
}, 5000);