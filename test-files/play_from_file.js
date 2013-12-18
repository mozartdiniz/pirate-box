var fs = require ('fs');
var mm = require('musicmetadata');
var lame = require('lame');
var Speaker = require('speaker');

var readedFiles = {};

function getFiles (dir) {
    var files = fs.readdirSync (dir);

    for(var i in files) {
        if(!files.hasOwnProperty (i)) continue;

        var name = dir + '/' + files[i];
        if(fs.statSync (name).isDirectory ()) {
            getFiles (name);
        } else {

            var parser = new mm(fs.createReadStream(dir + '/' + files));

            parser.on('metadata', (function (readedFiles, dir, file) {
                return function (result) {

                    readedFiles[result.title] = {
                        meta: result,
                        path: dir + '/' + file
                    };

                    console.log (result);

                }
            }(readedFiles, dir, files[i])));

        }
    }
}

getFiles ('/media/DarkFlashCard_/musics');
//
//var choosedFile = readedFiles[process.argv[2]];
//
console.log (readedFiles);
//
//
//fs.createReadStream(choosedFile)
//    .pipe(new lame.Decoder())
//    .on('format', function (format) {
//        this.pipe(new Speaker(format));
//    });