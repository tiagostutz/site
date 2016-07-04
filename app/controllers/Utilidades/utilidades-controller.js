angular.module("Servidor").controller('UtilidadeCtrl', function ($scope, $route, utilidadesAPI) {

    $scope.loading = false;
    $scope.lista = [];
    $scope.item;
    $scope.coluna1 = [];
    $scope.coluna2 = [];
    $scope.coluna3 = [];
    $scope.coluna4 = [];
    $scope.coluna5 = [];
    $scope.coluna6 = [];
    $scope.conteudoRelacionado = [];
    $scope.isConteudoRelacionado = false;
    $scope.isLoaded = false;
    $scope.hasColuna1 = false;
    $scope.hasColuna2 = false;
    $scope.hasColuna3 = false;
    $scope.hasColuna4 = false;
    $scope.hasColuna5 = false;
    $scope.hasColuna6 = false;

    $scope.abrirUrl = function (url, fonte) {
        if (fonte == 'Blog Direito dos Concursos' || fonte == 'Blog Servidor Legal')
            window.open(url);
        else
            window.location = url;
    };

    var carregarConteudoRelacionado = function (assunto) {
        $scope.loading = true;
        utilidadesAPI.getConteudoRelacionado(assunto, 1, 0).then(function (data) {
            if (data.statusText == "OK") {
                $scope.conteudoRelacionado = data.data.resultado;
                $scope.loading = false;
            }
        });
    };

    var carregarItens = function () {
        $scope.loading = true;
        utilidadesAPI.getItens().then(function (data) {
            if (data.statusText == "OK") {
                $(data.data.resultado).each(function () {
                    switch (this.colunaApresentacaonoSite)
                    {
                        case "Coluna 1": $scope.coluna1.push(this); $scope.hasColuna1 = true; break;
                        case "Coluna 2": $scope.coluna2.push(this); $scope.hasColuna2 = true; break;
                        case "Coluna 3": $scope.coluna3.push(this); $scope.hasColuna3 = true; break;
                        case "Coluna 4": $scope.coluna4.push(this); $scope.hasColuna4 = true; break;
                        case "Coluna 5": $scope.coluna5.push(this); $scope.hasColuna5 = true; break;
                        case "Coluna 6": $scope.coluna6.push(this); $scope.hasColuna6 = true; break;
                    }
                });

                $scope.lista = data.data.resultado;
                $scope.isLoaded = true;
                $scope.loading = false;
            }
        });
    };

        carregarItens();

});
