var EpisodeModel = (function (){

    var episode = function () {

        this.data = {
            title: '',
            season: 0,
            number: 0,
            watched: false,
            releaseDate: null
        }

    };

    episode.prototype = new BaseModel ();

    return episode;

}());