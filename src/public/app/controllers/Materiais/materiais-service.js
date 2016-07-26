angular.module("Servidor").factory('materiaisAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getLista = function (limit) {
        return $http.get(config.baseUrl + "/MateriaisEducativos/todos");
    };

    var _getItem = function (param, valor) {
        if(param == "id")
            return $http.get(config.baseUrl + "/MateriaisEducativos/porid?id=" + valor);
        else
            return $http.get(config.baseUrl + "/MateriaisEducativos/porurl?url=" + valor);
    };

    var _getPorPalavraChave = function (palavras, offset, page) {
        return $http.get(config.baseUrl + "/MateriaisEducativos/porpalavrachave?type=todos&palavras=" + palavras + "&offset=" + offset + "&page=" + page + "&sortby=DataPublicacao&order=desc");
    };

    var _getPorCampodeInteresse = function (campodeinteresse, offset, page) {
        return $http.get(config.baseUrl + "/MateriaisEducativos/porcampodeinteresse?type=todos&offset=" + offset + "&page=" + page + "&campodeInteresse=" + campodeinteresse + "&sortby=DataPublicacao&order=desc");
    };

    return {
        getLista: _getLista,
        getItem: _getItem,
        getPorCampodeInteresse: _getPorCampodeInteresse,
        getPorPalavraChave: _getPorPalavraChave
    };
});

