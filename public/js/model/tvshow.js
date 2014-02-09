var TVShowModel = (function (){

    var tvshow = function () {

        this.data = {
            title: '',
            picture: ''
        }

    };

    tvshow.prototype = new BaseModel ();

    return tvshow;

}());