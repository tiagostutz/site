angular.module("Servidor").controller('BlogsCtrl', function ($scope, $route, blogsAPI) {

    $scope.loading = false;
    $scope.lista = [];
    $scope.item;
    $scope.isLoaded = false;
    

    var carregarJulgados = function () {
        $scope.loading = true;
        blogsAPI.getItens().then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.isLoaded = true;
                $scope.loading = false;
            }
        });
    };

    carregarJulgados();

});