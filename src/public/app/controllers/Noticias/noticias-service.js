angular.module("Servidor").factory('noticiasAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getNoticias = function (limit) {
        return $http.get(config.baseUrl + "/Noticias/limitar?limit=" + limit + "&page=0");
    };

    var _getNoticia = function (id) {
        return $http.get(config.baseUrl + "/Noticias/porid?id=" + id);
    };

    var _getNoticiaPorUrl = function (url) {
        return $http.get(config.baseUrl + "/Noticias/porurl?url=" + url);
    };

    var _getConteudoRelacionado = function (id, assunto, offset, page) {
        return $http.get(config.baseUrl + "/Utilidades/conteudosporassunto?idAtual=" + id + "&assunto=" + assunto + "&offset=" + offset + "&page=" + page);
    };

    return {
        getNoticias: _getNoticias,
        getNoticia: _getNoticia,
        getNoticiaPorUrl: _getNoticiaPorUrl,
        getConteudoRelacionado: _getConteudoRelacionado
    };
});

