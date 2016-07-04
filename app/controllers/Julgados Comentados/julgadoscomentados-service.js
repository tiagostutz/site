angular.module("Servidor").factory('julgadoscomentadosAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getLista = function (limit, assunto) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/julgadoscomentados?limit=" + limit + "&assunto=" + assunto);
    };

    var _getPorPalavraChave = function (limit, palavras) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/JulgadosComentadosPorPalavra?limit=" + limit + "&palavra=" + palavras);
    };

    var _getPorCampodeInteresse = function (limit, campodeinteresse) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/JulgadosComentadosPorInteresse?limit=" + limit + "&campointeresse=" + campodeinteresse);
    };

    return {
        getLista: _getLista,
        getPorPalavraChave: _getPorPalavraChave,
        getPorCampodeInteresse: _getPorCampodeInteresse,
    };
});