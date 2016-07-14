angular.module("Servidor").controller('NaMidiaCtrl', function ($scope, $route, $rootScope, namidiaAPI, $sce) {

    $scope.loading = false;
    $scope.loadingRelacionados = false;
    $scope.conteudocarregado = false;
    $scope.nenhumConteudoRelacionado = false;
    $scope.lista = [];
    $scope.listaRelacionada = [];
    $scope.item;
    $scope.labelVeiculos;

    var carregarItens = function () {
        $scope.loading = true;
        namidiaAPI.getItens(10).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                
                if ($scope.item.assuntos != undefined) {
                    $scope.loadingRelacionados = true;
                    carregarConteudoRelacionado();
                }

                $scope.loading = false;
            }
        });
    };

    var carregarConteudoRelacionado = function () {
        $scope.loading = true;

        var assunto = "";

        for (var i = 0; i < $scope.item.assuntos.length; i++) {
            if (i > 0)
                assunto += ",";

            assunto += $scope.item.assuntos[i].id;
        }

        namidiaAPI.getConteudoRelacionado($scope.item.id, assunto, "1", "0").then(function (data) {
            if (data.statusText == "OK") {
                $scope.itensRelacionados = data.data.resultado;
                $scope.loading = false;
                $scope.loadingRelacionados = false;

                if ($scope.itensRelacionados.length == 0)
                    $scope.nenhumConteudoRelacionado = true;
            }
        });
    };

    var carregarNaMidiaPorUrl = function (url) {
        $scope.loading = true;
        namidiaAPI.getPorUrl(url).then(function (data) {
            if (data.statusText == "OK") {
                $scope.item = data.data.resultado;

                $scope.item.corpo = $sce.trustAsHtml($scope.item.corpo);
                console.log($scope.item.corpo);

                $rootScope.tituloPaginaURL = $scope.item.title;
                $rootScope.linkPaginaURL = $scope.item.url;
                $scope.conteudocarregado = true;
                
                if ($scope.item.veiculos.length > 1)
                    $scope.labelVeiculos = "Veiculos:";
                else if ($scope.item.veiculos.length == 1)
                    $scope.labelVeiculos = "Veiculo:";
                
                if ($scope.item.assuntos.length > 0) {
                    $scope.loadingRelacionados = true;
                    carregarConteudoRelacionado($scope.item.assuntos[0].title);
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
        namidiaAPI.getItem($route.current.params.id).then(function (data) {
            if (data.statusText == "OK") {
                $scope.item = data.data.resultado;
                $scope.loading = false;

                if ($scope.item.veiculos.length > 1)
                    $scope.labelVeiculos = "Veiculos:";
                else if ($scope.item.veiculos.length == 1)
                    $scope.labelVeiculos = "Veiculo:";


                $rootScope.tituloPaginaURL = $scope.item.title;
                $rootScope.linkPaginaURL = $scope.item.url;
            }
        });
    };

    if ($route.current.params.id != undefined)
        carregarItem();
    if ($route.current.params.url != undefined)
        carregarNaMidiaPorUrl($route.current.params.url);
    else
        carregarItens();

});