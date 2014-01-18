#! /usr/bin/env node

var args = process.argv;
var stdin = process.openStdin();
var colors = require('colors');
var commands = commands || {};
var options = options || {};
var cli = cli || {};

cli.processArgs = function () {

	var userArgs = args.slice(2),
	    terms = [],
	    contains = [],
	    notContains = [],
	    isOption,
	    option;

	for (var i = 0; i < userArgs.length; i++) {

		isOption = (userArgs[i].indexOf('-') === 0);

		if (isOption) {

			option = cli.getOption(userArgs[i]);
			contains = contains.concat(option.contains);
			notContains = notContains.concat(option.notContains);

		} else {

			terms.push(userArgs[i]);

		}

	}

	commands.get(terms, contains, notContains);

}

cli.getOption = function (userOption) {

	var value = userOption.substring(1),
	    optionObject = options[value];

	return optionObject;

}

/*
stdin.on('data', function (input) {

	var matches = input.toString().match(/(\w+)(.*)/),
	    command = matches[1].toLowerCase(),
	    args = matches[2].trim().split(/\s+/);

	commands[command](args);

});
*/

commands['get'] = function(terms, contains, notContains) {

	var finder = require('../torrentfinder'),
 	    mediaOptions = {};

	mediaOptions.terms = terms;
	mediaOptions.contains = contains;
	mediaOptions.doNotContain = notContains;

	var callbackFunctionWithBestMatch = function(result) {
		
        	process.stdout.write('Download best match (y/n)? '.green);

		stdin.on('data', function (input) {

			var parsedInput = input.toString().trim();

			if (parsedInput === 'y' || parsedInput === 'yes') {
				var exec = require('child_process').exec;
				var child = exec('transmission-remote -a ' + result.magnet, function (err, stdout, stderr) {
					if (err) {
						throw err;
					}
				
					console.log('your download will start shortly on transmission...');
					process.exit();

				});

			}

		});     

	};

	console.log("Requesting...");
	finder.FindBestMatch(mediaOptions, callbackFunctionWithBestMatch);

}

options['H'] = {
	contains: ['720p'],
	notContains: []
}

cli.processArgs();
