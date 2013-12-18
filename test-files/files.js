var fs = require('fs');

function getFiles (dir){
    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name);
        }else{
            console.log(name)
        }
    }
}

getFiles ('/media/DarkFlashCard_/musics');