angular.module("Servidor").controller('InformesCtrl', function ($scope, $route, $rootScope, $location, informesAPI, config) {

    $scope.loading = false;
    $scope.hasInformation = true;
    $scope.isBuscaFeita = false;
    $scope.lista = [];
    $scope.itensRelacionados = [];
    $scope.item;
    $scope.buscafeita;
    $scope.origempage;
    $scope.nameNext = "Próximo ›";
    $scope.namePrevious = "‹ Anterior";

    var carregarLista = function () {
        $scope.loading = true;

        var pagina = $route.current.params.page == undefined ? 0 : $route.current.params.page;

        informesAPI.getInformes(10, pagina).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                if ($scope.lista.length == 0)
                    $scope.hasInformation = false;
                $scope.loading = false;
            }
        });
    };

    var carregarListaPorPalavraChaveTipo = function (tipo, palavras) {
        $scope.loading = true;
        $scope.buscafeita = palavras;
        $scope.isBuscaFeita = true;
        informesAPI.getPorPalavraChaveTipo(tipo, palavras, 10, 0).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                if ($scope.lista.length == 0)
                    $scope.hasInformation = false;
                $scope.loading = false;
            }
        });
    };

    var carregarListaPorTipo = function (tipo) {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage = "index.html#";
        $scope.nextpage = "index.html#";
        $scope.origempage = "#!/informes/tipo/" + tipo + "/page/";

        var pagina = $route.current.params.page == undefined ? 0 : $route.current.params.page;
        informesAPI.getPorTipo(tipo, 10, pagina).then(function (data) {

            $scope.nextpage = $scope.origempage + (parseInt(pagina) + 1);
            $scope.pagination = true;

            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;

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

                $scope.loading = false;
            }
        });
    };

    var carregarListaPorCampodeInteresse = function (campodeinteresse) {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage = "index.html#";
        $scope.nextpage = "index.html#";
        $scope.origempage = "#!/informes/interesse/" + campodeinteresse + "/page/";

        var pagina = $route.current.params.page == undefined ? 0 : $route.current.params.page;

        informesAPI.getPorCampodeInteresse(campodeinteresse, 10, pagina).then(function (data) {

            $scope.nextpage = $scope.origempage + (parseInt(pagina) + 1);
            $scope.pagination = true;

            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
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

                $scope.loading = false;
            }
        });
    };

    var carregarListaPorPalavraChave = function (palavras) {
        $scope.loading = true;
        $scope.buscafeita = palavras;
        $scope.isBuscaFeita = true;
        informesAPI.getPorPalavraChave(palavras, 25, 0).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                if ($scope.lista.length == 0)
                    $scope.hasInformation = false;
                $scope.loading = false;
            }
        });
    };

    var carregarListaPorInteresseETipo = function (tipo, interesse) {
        $scope.loading = true;

        informesAPI.getPorCampodeInteresseETipo(tipo, interesse, 25, 0).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                if ($scope.lista.length == 0)
                    $scope.hasInformation = false;
                $scope.loading = false;
            }
        });
    };

    var carregarFiltroGeral = function () {
        $scope.loading = true;

        var tipo = $route.current.params.tipo;
        var interesse = $route.current.params.interesse;
        var palavras = $route.current.params.palavras;

        if (palavras == "Pesquisar...")
        {
            if(interesse != "0")
            {
                var camposdeInteresse = $rootScope.camposdeInteresse;

                $(camposdeInteresse).each(function () {
                    if(this.id == interesse)
                    {
                        $scope.buscafeita = this.title;
                    }
                });
            }
            else
                $scope.buscafeita = tipo;
        }
        else
            $scope.buscafeita = palavras;

        $scope.isBuscaFeita = true;

        var pagina = $route.current.params.page == undefined ? 0 : $route.current.params.page;


        informesAPI.getPorFiltroGeral(tipo, interesse, palavras, 25, pagina).then(function (data) {
            if (data.statusText == "OK") {
                $scope.lista = data.data.resultado;
                if ($scope.lista.length == 0)
                    $scope.hasInformation = false;
                $scope.loading = false;
            }
        });
    };

    var carregarItem = function () {
        $scope.loading = true;
        informesAPI.getInforme($route.current.params.id).then(function (data) {
            if (data.statusText == "OK") {
                $scope.item = data.data.resultado;
                $scope.loading = false;

                $rootScope.tituloPaginaURL = $scope.item.title;
                $rootScope.linkPaginaURL = $scope.item.url;

                $rootScope.seo = {
                    pageTitle: $scope.item.title,
                    pageDescription: $scope.item.brevedescricao,
                    pageURL: config.siteUrl + $scope.item.url
                };
            }
        });
    };

    if ($route.current.$$route.originalPath == "/informes/busca/:tipo/:interesse/:palavras" || $route.current.$$route.originalPath == "/informes/busca/:tipo/:interesse/:palavras/page/:page")
    {
        carregarFiltroGeral();
    }
    else
    {
        if ($route.current.params.id != undefined)
            carregarItem();
        else {
            if ($route.current.params.palavras != undefined && $route.current.params.tipo != undefined)
                carregarListaPorPalavraChaveTipo($route.current.params.tipo, $route.current.params.palavras);
            else if ($route.current.params.tipo != undefined && $route.current.params.interesse != undefined)
                carregarListaPorInteresseETipo($route.current.params.tipo, $route.current.params.interesse);
            else if ($route.current.params.interesse != undefined)
                carregarListaPorCampodeInteresse($route.current.params.interesse);
            else if ($route.current.params.tipo != undefined)
                carregarListaPorTipo($route.current.params.tipo);
            else if ($route.current.params.palavras != undefined)
                carregarListaPorPalavraChave($route.current.params.palavras);
            else
                carregarLista();
        }
    }

    $scope.getMenuTipoInformeStyle = function(page) {
      var current = $location.path().substring(1);
      return current.indexOf(page) !== -1 ? 'active' : '';
    }

});
