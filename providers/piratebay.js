var cheerio = require('cheerio');

var stringEndsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

module.exports = {
	parseResult : function(page) {
		var results = new Array();
		$ = cheerio.load(page, {ignoreWhitespace: true});

		var trs = $('#searchResult tr');
		if (trs !== 'undefined') {

			var size = trs.length;
			for (var i = 1; i < size; i++) {
				var tempDownload = {};

				var tdWithName = trs[i].children[1]; //tr -> td (name)
				var name = tdWithName.children[0].children[0].children[0].data; //td -> div -> a -> text -> data
				var magnet = tdWithName.children[1].attribs.href; //td -> a -> attribs.href

				var torrentTag = tdWithName.children[2]; //td -> a
				var torrent = null;
				if (torrentTag !== 'undefined' && torrentTag.attribs !== 'undefined' && torrentTag.attribs.href !== 'undefined') {
					torrent = torrentTag.attribs.href; //a --> attribs --> href
				}

				var seeds = trs[i].children[2].children[0].data; //tr -> td[2] -> text -> data
				var peers = trs[i].children[3].children[0].data; //tr -> td[3] -> text -> data

				tempDownload.name = name;
				tempDownload.seeds = seeds;
				tempDownload.peers = peers;
				tempDownload.magnet = magnet;
				if (torrent !== undefined && stringEndsWith(torrent, ".torrent")) {
					tempDownload.torrent = "http:" + torrent;
				}

				results.push(tempDownload);
			}
		}
		return results;
	}
};