angular.module("Servidor").factory('camposdeinteresseAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getItens = function () {
        return $http.get(config.baseUrl + "/SPCamposdeInteresse/todos");
    };

    var _getItem = function (url) {
        return $http.get(config.baseUrl + "/SPCamposdeInteresse/porurl?url=" + url);
    };

    return {
        getItens: _getItens,
        getItem: _getItem
    };
});

