var Client = require('node-torrent');
var client = new Client({logLevel: 'DEBUG'});
var torrent = client.addTorrent('homeland.torrent');

torrent.on('complete', function() {
    console.log('complete!');
    torrent.files.forEach(function(file) {
        var newPath = './' + file.path;
        fs.rename(file.path, newPath);
        // while still seeding need to make sure file.path points to the right place
        file.path = newPath;
    });
});