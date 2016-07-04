angular.module("Servidor").controller('MateriaisCtrl', function ($scope, $route, $rootScope, materiaisAPI) {

    $scope.loading = false;
    $scope.lista = [];
    $scope.itensRelacionados = [];
    $scope.item;
    $rootScope.tituloPaginaURL = "Materiais";
    $rootScope.linkPaginaURL = "/#/materiais";

    var carregarLista = function () {
        $scope.loading = true;
        materiaisAPI.getLista(10).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;
            }
        });
    };

    var carregarListaPorPalavraChave = function (palavras) {
        $scope.loading = true;
        materiaisAPI.getPorPalavraChave(palavras, 25, 0).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;
            }
        });
    };

    var carregarListaPorCampodeInteresse = function (campodeinteresse) {
        $scope.loading = true;
        materiaisAPI.getPorCampodeInteresse(campodeinteresse, 10, 0).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;
            }
        });
    };

    var carregarItem = function (param, valor) {
        $scope.loading = true;
        materiaisAPI.getItem(param, valor).then(function (data) {
            if (data.statusText == "OK") {
                if (param == "url") 
                    $scope.item = data.data.resultado[0];
                else
                    $scope.item = data.data.resultado;
                $scope.loading = false;
            }
        });
    };

    if ($route.current.params.id != undefined)
        carregarItem("id", $route.current.params.id);
    if ($route.current.params.urljurisprudencia != undefined)
        carregarItem("url", $route.current.params.urljurisprudencia);
    else if ($route.current.params.interesse != undefined)
        carregarListaPorCampodeInteresse($route.current.params.interesse);
    else if ($route.current.params.palavras != undefined)
        carregarListaPorPalavraChave($route.current.params.palavras);
    else
        carregarLista();

});