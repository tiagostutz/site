angular.module("Servidor").factory('namidiaAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getItens = function (limit) {
        return $http.get(config.baseUrl + "/NaMidia/limitar?limit=" + limit);
    };

    var _getItem = function (id) {
        return $http.get(config.baseUrl + "/NaMidia/porid?id=" + id);
    };

    var _getPorUrl = function (url) {
        return $http.get(config.baseUrl + "/NaMidia/porurl?url=" + url);
    };

    var _getConteudoRelacionado = function (id, assunto, offset, page) {
        return $http.get(config.baseUrl + "/Utilidades/conteudosporassunto?idAtual=" + id + "&assunto=" + assunto + "&offset=" + offset + "&page=" + page);
    };

    return {
        getItens: _getItens,
        getItem: _getItem,
        getPorUrl: _getPorUrl,
        getConteudoRelacionado: _getConteudoRelacionado
    };
});

