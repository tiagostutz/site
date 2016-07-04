angular.module("Servidor").factory('jurisprudenciaAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getLista = function (limit, page) {
        return $http.get(config.baseUrl + "/Jurisprudencia/limitar?limit=" + limit + "&page=" + page);
    };

    var _getItem = function (param, valor) {
        if(param == "id")
            return $http.get(config.baseUrl + "/Jurisprudencia/porid?id=" + valor);
        else
            return $http.get(config.baseUrl + "/Jurisprudencia/porurl?url=" + valor);
    };

    var _getPorPalavraChave = function (palavras, offset, page) {
        return $http.get(config.baseUrl + "/Jurisprudencia/porpalavrachave?type=todos&palavras=" + palavras + "&offset=" + offset + "&page=" + page + "&sortby=DataPublicacao&order=desc");
    };

    var _getPorCampodeInteresse = function (campodeinteresse, offset, page) {
        return $http.get(config.baseUrl + "/Jurisprudencia/porcampodeinteresse?type=todos&offset=" + offset + "&page=" + page + "&campodeInteresse=" + campodeinteresse + "&sortby=DataPublicacao&order=desc");
    };

    var _getConteudoRelacionado = function (id, assunto, offset, page) {
        return $http.get(config.baseUrl + "/Utilidades/conteudosporassunto?idAtual=" + id + "&assunto=" + assunto + "&offset=" + offset + "&page=" + page);
    };

    var _getPorFiltroGeral = function (palavras, interesse, offset, page) {
        return $http.get(config.baseUrl + "/Jurisprudencia/buscar?palavras=" + palavras + "&interesse=" + interesse + "&offset=" + offset + "&page=" + page + "&sortby=DataPublicacao&order=desc");
    };

    return {
        getLista: _getLista,
        getItem: _getItem,
        getPorCampodeInteresse: _getPorCampodeInteresse,
        getPorPalavraChave: _getPorPalavraChave,
        getConteudoRelacionado: _getConteudoRelacionado,
        getPorFiltroGeral: _getPorFiltroGeral
    };
});

