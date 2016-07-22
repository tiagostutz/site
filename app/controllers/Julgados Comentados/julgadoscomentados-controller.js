angular.module("Servidor").controller('JulgadosComentadosCtrl', function ($scope, $route, $rootScope, julgadoscomentadosAPI, config) {

    $scope.loading = false;
    $scope.hasInformation = true;
    $scope.lista = [];
    $scope.item;

    var carregarLista = function () {
        $scope.loading = true;
        var assunto = $route.current.params.assunto;

        julgadoscomentadosAPI.getLista(5, assunto).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;

                if ($scope.lista.length == 0)
                    $scope.hasInformation = false;
                else {
                    if ($route.current.$$route.originalPath == "/julgadoscomentados") {
                        $scope.item = $scope.lista[0];
                        $rootScope.tituloPaginaURL = $scope.item.title;
                        $rootScope.linkPaginaURL = $scope.item.url;
                        
                        $rootScope.seo = {
                            pageTitle: $scope.item.title,
                            pageDescription: $scope.item.brevedescricao,
                            pageURL: config.siteUrl + "#!/julgadoscomentados/" + $scope.item.url
                        };

                    }
                }
            }
        });
    };

    var carregarListaPorPalavraChave = function (palavras) {
        $scope.loading = true;
        julgadoscomentadosAPI.getPorPalavraChave(5, palavras).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;

                if ($scope.lista.length == 0)
                    $scope.hasInformation = false;
                else {
                    $scope.item = $scope.lista[0];
                    $rootScope.tituloPaginaURL = $scope.item.title;
                    $rootScope.linkPaginaURL = $scope.item.url;
                }
            }
        });
    };

    var carregarListaPorCampodeInteresse = function (campodeinteresse) {
        $scope.loading = true;
        julgadoscomentadosAPI.getPorCampodeInteresse(5, campodeinteresse).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;

                if ($scope.lista.length == 0)
                    $scope.hasInformation = false;
                else {
                    $scope.item = $scope.lista[0];
                    $rootScope.tituloPaginaURL = $scope.item.title;
                    $rootScope.linkPaginaURL = $scope.item.url;
                }
            }
        });
    };

    //if ($route.current.params.palavras != undefined)
    //    carregarListaPorPalavraChave($route.current.params.palavras);
    //else if ($route.current.params.interesse != undefined)
    //    carregarListaPorCampodeInteresse($route.current.params.interesse);
    //else
        carregarLista();

});