angular.module("Servidor").factory('blogsAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getItens = function () {
        return $http.get(config.baseUrl + "/JulgadosComentados/");
    };

    return {
        getItens: _getItens,
    };
});

