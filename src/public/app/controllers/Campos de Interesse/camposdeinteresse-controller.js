angular.module("Servidor").controller('CamposdeInteresseCtrl', function ($scope, $route, $rootScope, camposdeinteresseAPI, config) {

    $scope.loading = false;
    $scope.lista = [];
    $scope.item;
    $scope.exemplos = [];
    $scope.aspasdedestaque;
    $scope.tituloPaginaURL = "";




    var carregarCamposdeInteresse = function () {
        $scope.loading = true;
        camposdeinteresseAPI.getItens().then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;
                $rootScope.camposdeInteresse = data.data.resultado;
            }
        });
    };

    var carregarCampodeInteressePorUrl = function () {
        $scope.loading = true;
        camposdeinteresseAPI.getItem($route.current.params.urlcampo).then(function (data) {
            if (data.statusText == "OK") {
                $scope.item = data.data.resultado;
                if (data.data.resultado != null)
                    $scope.exemplos = data.data.resultado.exemplos;
                $scope.tituloPaginaURL = $route.current.params.urlcampo;
                
                $rootScope.seo = {
                    pageTitle: $scope.item.title,
                    pageDescription: $scope.item.descricao,
                    pageURL: config.siteUrl + "#!/camposdeinteresse/" + $scope.item.url
                };

                $scope.loading = false;
            }
        });
    };

    
    if ($route.current.params.urlcampo != undefined) {
        if ($route.current.params.urlcampo != "yes")
            carregarCampodeInteressePorUrl();
        else
            carregarCamposdeInteresse();
    }
    else
        carregarCamposdeInteresse();

    if ($route.current.$$route.originalPath == "/camposdeinteresse/:urlcampo")
        carregarCamposdeInteresse();

});