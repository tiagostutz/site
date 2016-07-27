angular.module("Servidor").controller('AtuacoesCtrl', function ($scope, $route, $rootScope, atuacoesAPI, $sce, config) {

    $scope.loading = false;
    $scope.loadingRelacionados = false;
    $scope.conteudocarregado = false;
    $scope.nenhumConteudoRelacionado = false;
    $scope.lista = [];
    $scope.listaRelacionada = [];
    $scope.item;
    $scope.origempage;
    $scope.nameNext = "Próximo ›";
    $scope.namePrevious = "‹ Anterior";

    $scope.validaUrl = function (url) {
        var parametros = url.split('/');
        var ultimo = parametros[parametros.length - 1];
    };



    var carregarItens = function () {
        $scope.loading = true;

        atuacoesAPI.getItens(10).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;

                if ($scope.item.assuntos != undefined) {
                    $scope.loadingRelacionados = true;
                    if ($scope.item.assuntos.length > 0)
                        carregarConteudoRelacionado($scope.item.assuntos);
                }

                $scope.loading = false;
            }
        });
    };

    var carregarConteudoRelacionado = function () {
        $scope.loading = true;

        var assuntos = "";

        for (var i = 0; i < $scope.item.assuntos.length; i++)
        {
            if (i > 0)
                assuntos += ",";

            assuntos += $scope.item.assuntos[i].id;
        }

        atuacoesAPI.getConteudoRelacionado($scope.item.id, assuntos, "1", "0").then(function (data) {
            if (data.statusText == "OK") {
                $scope.itensRelacionados = data.data.resultado;
                $scope.loading = false;
                $scope.loadingRelacionados = false;

                if ($scope.itensRelacionados.length == 0)
                    $scope.nenhumConteudoRelacionado = true;
            }
        });
    };

    var carregarVitorias = function () {
        $scope.loading = true;
        var pagina = $route.current.params.page == undefined ? 0 : $route.current.params.page;

        atuacoesAPI.getVitorias(pagina).then(function (data) {

            $scope.nextpage = $scope.origempage + (parseInt(pagina) + 1);
            $scope.pagination = true;

            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;

                if ($scope.lista.length == 0) {
                    $scope.hasInformation = false;
                    $scope.pagination = false;
                }

                if ($scope.lista.length < 10)
                    $scope.nextview = false;
                else
                    $scope.nextview = true;


                if (pagina > 0)
                    $scope.previousview = true;
                else
                    $scope.previousview = false;
            }
        });
    };

    var carregaraPorUrl = function (url) {
        $scope.loading = true;
        atuacoesAPI.getPorUrl(url).then(function (data) {
            if (data.statusText == "OK") {
                $scope.item = data.data.resultado;

                $scope.conteudocarregado = true;

                $rootScope.tituloPaginaURL = $scope.item.title;
                $rootScope.linkPaginaURL = $scope.item.url;

                $rootScope.seo = {
                    pageTitle: $scope.item.title,
                    pageDescription: $scope.item.breveDescricao,
                    pageURL: config.siteUrl + "/atuacoes/" + $scope.item.url
                };

                if ($scope.item.assuntos.length > 0) {
                    $scope.loadingRelacionados = true;
                    carregarConteudoRelacionado();
                }
                else {
                    $scope.loadingRelacionados = false;
                }

                $scope.loading = false;
            }
        });
    };

    var carregarItem = function () {
        $scope.loading = true;
        atuacoesAPI.getItem($route.current.params.id).then(function (data) {
            if (data.statusText == "OK") {
                $scope.item = data.data.resultado;
                $scope.loading = false;

                $rootScope.tituloPaginaURL = $scope.item.title;
                $rootScope.linkPaginaURL = $scope.item.url;

                $rootScope.seo = {
                    pageTitle: $scope.item.title,
                    pageDescription: $scope.item.breveDescricao,
                    pageURL: config.siteUrl + "/atuacoes/" + $scope.item.url
                };

            }
        });
    };

console.log($route.current.$$route.originalPath);

    if ($route.current.$$route.originalPath.indexOf("/vitorias") > -1)
        carregarVitorias();
    else {
        if ($route.current.params.id != undefined)
            carregarItem();
        if ($route.current.params.url != undefined)
            carregaraPorUrl($route.current.params.url);
        else
            carregarItens();
    }
});
