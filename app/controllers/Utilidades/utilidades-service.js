angular.module("Servidor").factory('utilidadesAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getItens = function (pagina) {
        return $http.get(config.baseUrl + "/ListaConsolidadaConteudo/BuscarConteudo");
    };

    var _getItem = function (valor, tipo) {
        if (tipo == "id")
            return $http.get(config.baseUrl + "/SPSegmentos/porid?id=" + valor);
        else if (tipo == "url")
            return $http.get(config.baseUrl + "/SPSegmentos/porurl?url=" + valor);
    };

    var _getConteudoRelacionado = function (assunto, offset, page) {
        return $http.get(config.baseUrl + "/Utilidades/conteudosporassunto?assunto=" + assunto + "&offset=" + offset + "&page=" + page);
    };

    return {
        getItens: _getItens,
        getItem: _getItem,
        getConteudoRelacionado: _getConteudoRelacionado
    };
});

