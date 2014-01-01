// Use node subDB.js '<movie_file_name>' '<language_code>'

var SubDb = require("subdb");
var subdb = new SubDb();
var fileName = process.argv[process.argv.length-2];
var language = process.argv[process.argv.length-1];
var subtitleName = fileName.substring(0, fileName.lastIndexOf('.')) + '.srt';

subdb.computeHash(fileName, function(err, res) {
    if(err) return err;

    var hash = res;
    subdb.api.search_subtitles(hash, function(err, res){
	
	console.log(res);

        if(err) return err;

		subdb.api.download_subtitle(hash, language, subtitleName, function(err, res) {
		                if(err) return err;

		                // sub is normally fetched into pathtosub.srt
		            });

    });
})
