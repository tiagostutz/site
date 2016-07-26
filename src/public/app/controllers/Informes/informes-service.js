angular.module("Servidor").factory('informesAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getInformes = function (limit, pagina) {
        return $http.get(config.baseUrl + "/Informes/buscar?type=todos&offset=" + limit + "&page=" + pagina + "&sortby=DataPublicacao&order=desc&filter=&filterValue=");
    };

    var _getInforme = function (id) {
        return $http.get(config.baseUrl + "/Informes/porid?id=" + id);
    };

    var _getPorPalavraChave = function (palavras, offset, page) {
        return $http.get(config.baseUrl + "/Informes/porpalavrachave?type=todos&palavras=" + palavras + "&offset=" + offset + "&page=" + page + "&sortby=DataPublicacao&order=desc");
    };

    var _getPorPalavraChaveTipo = function (tipo, palavras, offset, page) {
        return $http.get(config.baseUrl + "/Informes/porpalavrachave?type=" + tipo + "&palavras="+palavras+"&offset=" + offset + "&page=" + page + "&sortby=DataPublicacao&order=desc");
    };

    var _getPorCampodeInteresse = function (campodeinteresse, offset, page) {
        return $http.get(config.baseUrl + "/Informes/porcampodeinteresse?type=todos&offset=" + offset + "&page=" + page + "&campodeInteresse=" + campodeinteresse + "&sortby=DataPublicacao&order=desc");
    };

    var _getPorCampodeInteresseETipo = function (tipo, campodeinteresse, offset, page) {
        return $http.get(config.baseUrl + "/Informes/porcampodeinteresse?type=" + tipo + "&offset=" + offset + "&page=" + page + "&campodeInteresse=" + campodeinteresse + "&sortby=DataPublicacao&order=desc");
    };

    var _getPorTipo = function (tipo, offset, page) {
        return $http.get(config.baseUrl + "/Informes/buscar?type=" + tipo + "&offset=" + offset + "&page=" + page + "&sortby=DataPublicacao&order=desc");
    };

    var _getPorFiltroGeral = function (tipo, interesse, palavras, offset, page) {
        return $http.get(config.baseUrl + "/Informes/buscar?tipo=" + tipo + "&interesse=" + interesse + "&palavras=" + palavras + "&offset=" + offset + "&page=" + page);
    };

    return {
        getInformes: _getInformes,
        getInforme: _getInforme,
        getPorCampodeInteresse: _getPorCampodeInteresse,
        getPorTipo: _getPorTipo,
        getPorPalavraChave: _getPorPalavraChave,
        getPorPalavraChaveTipo: _getPorPalavraChaveTipo,
        getPorCampodeInteresseETipo: _getPorCampodeInteresseETipo,
        getPorFiltroGeral: _getPorFiltroGeral
    };
});

