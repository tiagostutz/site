angular.module("Servidor").factory('atuacoesAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getItens = function (limit) {
        return $http.get(config.baseUrl + "/Atuacoes/limitar?limit=" + limit);
    };

    var _getItem = function (id) {
        return $http.get(config.baseUrl + "/Atuacoes/porid?id=" + id);
    };

    var _getPorUrl = function (url) {
        return $http.get(config.baseUrl + "/Atuacoes/porurl?url=" + url);
    };

    var _getVitorias = function (pagina) {
        return $http.get(config.baseUrl + "/Atuacoes/TodasVitorias?pagina=" + pagina);
    };

    var _getConteudoRelacionado = function (id, assunto, offset, page) {
        return $http.get(config.baseUrl + "/Utilidades/conteudosporassunto?idAtual=" + id + "&assunto=" + assunto + "&offset=" + offset + "&page=" + page);
    };

    return {
        getItens: _getItens,
        getItem: _getItem,
        getPorUrl: _getPorUrl,
        getConteudoRelacionado: _getConteudoRelacionado,
        getVitorias: _getVitorias
    };
});

