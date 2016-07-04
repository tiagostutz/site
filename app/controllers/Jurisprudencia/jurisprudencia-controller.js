angular.module("Servidor").controller('JurisprudenciaCtrl', function ($scope, $route, $rootScope, jurisprudenciaAPI) {

    $scope.loading = false;
    $scope.hasInformation = true;
    $scope.isBuscaFeita = false;
    $scope.hasInformationRelacionado = true;
    $scope.nenhumConteudoRelacionado = false;
    $scope.conteudoCarregado = false;
    $scope.loadingRelacionados = false;
    $scope.lista = [];
    $scope.itensRelacionados = [];
    $scope.item;
    $scope.buscafeita;
    $scope.origempage;
    $scope.nameNext = "Próximo ›";
    $scope.namePrevious = "‹ Anterior";

    var carregarLista = function () {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage = "index.html#";
        $scope.nextpage = "index.html#";
        $scope.origempage = "#/jurisprudencia/page/";

        var pagina = $route.current.params.page == undefined ? 0 : $route.current.params.page;
        jurisprudenciaAPI.getLista(10, pagina).then(function (data) {

            $scope.nextpage = $scope.origempage + (parseInt(pagina) + 1);
            $scope.pagination = true;

            if (data.statusText == "OK") {

                $scope.lista = data.data.resultado;
                $scope.conteudoCarregado = true;

                if ($scope.lista.length == 0)
                    $scope.hasInformation = false;
                else {
                    $scope.item = $scope.lista[0];
                    $rootScope.tituloPaginaURL = $scope.item.title;
                    $rootScope.linkPaginaURL = $scope.item.url;
                }

                if ($scope.lista.length < 10)
                    $scope.nextview = false;
                else
                    $scope.nextview = true;


                if (pagina > 0)
                    $scope.previousview = true;
                else
                    $scope.previousview = false;

                $scope.loading = false;
            }
        });
    };

    var carregarConteudoRelacionado = function (assunto) {
        $scope.loading = true;
        $scope.loadingRelacionados = true;
        jurisprudenciaAPI.getConteudoRelacionado($scope.item.id, assunto, "3", "0").then(function (data) {
            if (data.statusText == "OK") {
                $scope.itensRelacionados = data.data.resultado;
                $scope.loading = false;
                $scope.loadingRelacionados = false;

                if ($scope.itensRelacionados.length == 0)
                    $scope.nenhumConteudoRelacionado = true;


            }
        });
    };

    var carregarListaPorPalavraChave = function (palavras) {
        $scope.loading = true;
        jurisprudenciaAPI.getPorPalavraChave(palavras, 25, 0).then(function (data) {
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

    var carregarFiltroGeral = function () {
        $scope.loading = true;
        var interesse = $route.current.params.interesse;
        var palavras = $route.current.params.palavras;

        if (palavras == "Pesquisar...") {
            if (interesse != "0") {
                var camposdeInteresse = $rootScope.camposdeInteresse;

                $(camposdeInteresse).each(function () {
                    if (this.id == interesse) {
                        $scope.buscafeita = this.title;
                    }
                });
            }
        }
        else
            $scope.buscafeita = palavras;

        $scope.isBuscaFeita = true;

        jurisprudenciaAPI.getPorFiltroGeral(palavras, interesse, 25, 0).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;
                $scope.conteudoCarregado = true;

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
        jurisprudenciaAPI.getPorCampodeInteresse(campodeinteresse, 10, 0).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                $scope.loading = false;

                if ($scope.lista.length == 0)
                    $scope.hasInformation = false;
            }
        });
    };

    var carregarItem = function (param, valor) {
        $scope.loading = true;
        jurisprudenciaAPI.getItem(param, valor).then(function (data) {
            if (data.statusText == "OK") {
                if (param == "url") 
                    $scope.item = data.data.resultado[0];
                else
                    $scope.item = data.data.resultado;

                $rootScope.tituloPaginaURL = $scope.item.title;
                $rootScope.linkPaginaURL = $scope.item.url;

                if ($scope.item.assuntos != undefined)
                    if ($scope.item.assuntos.length > 0)
                        carregarConteudoRelacionado($scope.item.assuntos[0].id);

                $scope.loading = false;
                $scope.conteudoCarregado = true;
            }
        });
    };

    if ($route.current.$$route.originalPath == "/jurisprudencia/busca/:palavras/:interesse") {
        carregarFiltroGeral();
    }
    else {
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
    }

});