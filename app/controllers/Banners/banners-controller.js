angular.module("Servidor").controller('BannersCtrl', function ($scope, $route, bannersAPI) {

    $scope.loading = false;
    $scope.lista = [];
    $scope.item;

    var carregarItens = function () {
        $scope.loading = true;
        bannersAPI.getItens().then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;
            }
        });
    };

    carregarItens();

});