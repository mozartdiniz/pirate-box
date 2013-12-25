var fs = require ('fs');
//var mm = require('musicmetadata');
var lame = require('lame');
var Speaker = require('speaker');

var readedFiles = [];
var index = 0;

function getFiles (dir) {
    var files = fs.readdirSync (dir);

    for(var i in files) {
        if(!files.hasOwnProperty (i)) continue;

        var name = dir + '/' + files[i];
        if(fs.statSync (name).isDirectory ()) {
            getFiles (name);
        } else {

            readedFiles.push({
                name: files[i],
                path: dir + '/' + files[i]
            });

        }
    }
}

getFiles ('/media/DarkFlashCard/musics');

console.log (readedFiles);

function play () {

    var stream = fs.createReadStream(readedFiles[index].path);
    var speaker = new Speaker ();
    speaker.on ('finish', play);
    stream.pipe(new lame.Decoder()).pipe(speaker);

    console.log ('playing: ' + readedFiles[index].name)

    index += 1;

}

play ();