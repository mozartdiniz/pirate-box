var routes = (function (){

    return function () {

        router.add("/my_path", function() {
            alert ('aaa');
        });

        router.start();

    }

}());