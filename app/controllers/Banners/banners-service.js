angular.module("Servidor").factory('bannersAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getItens = function () {
        return $http.get(config.baseUrl + "/Banners/todos?listname=Banners");
    };

    return {
        getItens: _getItens,
    };
});

