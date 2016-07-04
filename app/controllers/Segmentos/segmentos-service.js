angular.module("Servidor").factory('segmentosAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getItens = function () {
        return $http.get(config.baseUrl + "/SPSegmentos/todos");
    };

    var _getItem = function (valor, tipo) {
        if (tipo == "id")
            return $http.get(config.baseUrl + "/SPSegmentos/porid?id=" + valor);
        else if (tipo == "url")
            return $http.get(config.baseUrl + "/SPSegmentos/porurl?url=" + valor);
    };

    return {
        getItens: _getItens,
        getItem: _getItem
    };
});

