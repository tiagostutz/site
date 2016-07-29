angular.module("Servidor").controller('NoticiasCtrl', function ($scope, $route, $rootScope, noticiasAPI, $sce, config) {

    $scope.loading = false;
    $scope.loadingRelacionados = false;
    $scope.nenhumConteudoRelacionado = false;
    $scope.conteudocarregado = false;
    $scope.lista = [];
    $scope.itensRelacionados = [];
    $scope.item;

    var carregarNoticias = function () {
        $scope.loading = true;
        noticiasAPI.getNoticias(10).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;
            }
        });
    };

    var carregarNoticiaPorUrl = function (url) {
        $scope.loading = true;
        noticiasAPI.getNoticiaPorUrl(url).then(function (data) {
            if (data.statusText == "OK") {
                $scope.item = data.data.resultado;
                $scope.loadingRelacionados = true;
                $scope.conteudocarregado = true;

                $scope.item.corpo = $sce.trustAsHtml($scope.item.corpo);

                $rootScope.seo = {
                    pageTitle: $scope.item.title,
                    pageDescription: $scope.item.breveDescricao,
                    pageURL: config.siteUrl + "/noticias/" + $scope.item.url
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

    var carregarConteudoRelacionado = function () {
        $scope.loading = true;

        var assunto = "";

        for (var i = 0; i < $scope.item.assuntos.length; i++)
        {
            if (i > 0)
                assunto += ",";

            assunto += $scope.item.assuntos[i].id;
        }

        noticiasAPI.getConteudoRelacionado($scope.item.id, assunto, "1", "0").then(function (data) {
            if (data.statusText == "OK") {
                $scope.itensRelacionados = data.data.resultado;

                for (var i = 0; i < $scope.itensRelacionados.length; i++) {
                  $scope.itensRelacionados[i].url = $scope.itensRelacionados[i].url.replace('/#/','/');
                }

                $scope.loading = false;
                $scope.loadingRelacionados = false;

                if ($scope.itensRelacionados.length == 0)
                    $scope.nenhumConteudoRelacionado = true;
            }
        });
    };

    var carregarNoticia = function () {
        $scope.loading = true;
        noticiasAPI.getNoticia($route.current.params.id).then(function (data) {
            if (data.statusText == "OK") {
                $scope.item = data.data.resultado;
                $scope.loading = false;

                $rootScope.tituloPaginaURL = $scope.item.title;
                $rootScope.linkPaginaURL = $scope.item.url;

                $rootScope.seo = {
                    pageTitle: $scope.item.title,
                    pageDescription: $scope.item.breveDescricao,
                    pageURL: config.siteUrl + "/noticias/" + $scope.item.url
                };
            }
        });
    };

    if ($route.current.params.id != undefined)
        carregarNoticia();
    if ($route.current.params.url != undefined)
        carregarNoticiaPorUrl($route.current.params.url);
    else
        carregarNoticias();

});
