var app = angular
    .module('Servidor', ['ngRoute', 'ngSanitize']);

app.config(['$httpProvider',function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]).config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'app/views/Main/main.html',
            controller: 'MainController'
        })
        .when('/noticias', {
            templateUrl: 'app/views/Noticias/noticias.html',
            controller: 'NoticiasCtrl'
        })
        .when('/contato', {
            templateUrl: 'app/views/Contato/contato.html',
        })
        .when('/contato/ref/', {
            templateUrl: 'app/views/Contato/contato.html',
        })
        .when('/contato/ref/:ref', {
            templateUrl: 'app/views/Contato/contato.html',
        })
        .when('/contato/ref/:ref/aspas/', {
            templateUrl: 'app/views/Contato/contato.html',
        })
        .when('/contato/ref/:ref/exemplo/:exemplo', {
            templateUrl: 'app/views/Contato/contato.html',
        })
        .when('/noticia/:id', {
            templateUrl: 'app/views/Noticias/noticia.html',
            controller: 'NoticiasCtrl'
        })
        .when('/noticias/:url', {
            templateUrl: 'app/views/Noticias/noticia.html',
            controller: 'NoticiasCtrl'
        })
        .when('/informes/:url', {
            templateUrl: 'app/views/Informes/informes.html',
            controller: 'InformesCtrl'
        })
        .when('/informes/tipo/:tipo', {
            templateUrl: 'app/views/Informes/informes.html',
            controller: 'InformesCtrl'
        })
        .when('/informes/tipo/:tipo/page/:page', {
            templateUrl: 'app/views/Informes/informes.html',
            controller: 'InformesCtrl'
        })
        .when('/informes/q/:palavras', {
            templateUrl: 'app/views/Informes/informes.html',
            controller: 'InformesCtrl'
        })
        .when('/informes/q/:palavras/:tipo', {
            templateUrl: 'app/views/Informes/informes.html',
            controller: 'InformesCtrl'
        })
        .when('/informes/interesse/:interesse', {
            templateUrl: 'app/views/Informes/informes.html',
            controller: 'InformesCtrl'
        })
        .when('/informes/interesse/:interesse/page/:page', {
            templateUrl: 'app/views/Informes/informes.html',
            controller: 'InformesCtrl'
        })
        .when('/informes/interesse/:interesse/:tipo', {
            templateUrl: 'app/views/Informes/informes.html',
            controller: 'InformesCtrl'
        })
        .when('/informes/busca/:tipo/:interesse/:palavras', {
            templateUrl: 'app/views/Informes/informes.html',
            controller: 'InformesCtrl'
        })
        .when('/informes/busca/:tipo/:interesse/:palavras/page/:page', {
            templateUrl: 'app/views/Informes/informes.html',
            controller: 'InformesCtrl'
        })
        .when('/informes', {
            templateUrl: 'app/views/Informes/informes.html',
            controller: 'InformesCtrl'
        })
        .when('/jurisprudencia', {
            templateUrl: 'app/views/Jurisprudencia/jurisprudencias.html',
            controller: 'JurisprudenciaCtrl'
        })
        .when('/jurisprudencia/page/:page', {
            templateUrl: 'app/views/Jurisprudencia/jurisprudencias.html',
            controller: 'JurisprudenciaCtrl'
        })
        .when('/jurisprudencias/interesse/:interesse', {
            templateUrl: 'app/views/Jurisprudencia/jurisprudencias.html',
            controller: 'JurisprudenciaCtrl'
        })
        .when('/jurisprudencias/q/:palavras', {
            templateUrl: 'app/views/Jurisprudencia/jurisprudencias.html',
            controller: 'JurisprudenciaCtrl'
        })
        .when('/jurisprudencia/busca/:palavras/:interesse', {
            templateUrl: 'app/views/Jurisprudencia/jurisprudencias.html',
            controller: 'JurisprudenciaCtrl'
        })
        .when('/jurisprudencia/:urljurisprudencia/:assunto', {
            templateUrl: 'app/views/Jurisprudencia/jurisprudencia.html',
            controller: 'JurisprudenciaCtrl'
        })
        .when('/julgadoscomentados', {
            templateUrl: 'app/views/Jurisprudencia/julgadoscomentados.html',
            controller: 'JulgadosComentadosCtrl'
        })
        .when('/julgadoscomentados/q/:palavras', {
            templateUrl: 'app/views/Jurisprudencia/julgadoscomentados.html',
            controller: 'JulgadosComentadosCtrl'
        })
        .when('/julgadoscomentados/interesse/:interesse', {
            templateUrl: 'app/views/Jurisprudencia/julgadoscomentados.html',
            controller: 'JulgadosComentadosCtrl'
        })
        .when('/namidia', {
            templateUrl: 'app/views/NaMidia/namidia-lista.html',
            controller: 'NaMidiaCtrl'
        })
        .when('/namidia/:url', {
            templateUrl: 'app/views/NaMidia/namidia-lista.html',
            controller: 'NaMidiaCtrl'
        })
        .when('/atuacoes/:url', {
            templateUrl: 'app/views/Atuacoes/atuacao.html',
            controller: 'AtuacoesCtrl'
        })
        .when('/vitorias', {
            templateUrl: 'app/views/Atuacoes/vitorias.html',
            controller: 'AtuacoesCtrl'
        })
        .when('/vitorias/:page', {
            templateUrl: 'app/views/Atuacoes/vitorias.html',
            controller: 'AtuacoesCtrl'
        })
        .when('/materiais', {
            templateUrl: 'app/views/Materiais/materiais.html',
            controller: 'MateriaisCtrl',
        })
        .when('/escritorio', {
            templateUrl: 'app/views/Escritorio/escritorio.html',
        })
        .when('/enderecos', {
            templateUrl: 'app/views/Enderecos/enderecos.html',
        })
        .when('/clientes', {
            templateUrl: 'app/views/Clientes/clientes.html',
        })
        .when('/imprensa', {
            templateUrl: 'app/views/Imprensa/imprensa.html',
        })
        .when('/blogservidorlegal/posts', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/blogservidorlegal/post/:id', {
            templateUrl: 'app/views/BlogServidorLegal/post.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/blogdireitodosconcursos/posts', {
            templateUrl: 'app/views/BlogDireitodosConcursos/posts.html',
            controller: 'PostsDireitodosConcursosCtrl'
        })
        .when('/blogdireitodosconcursos/post/:id', {
            templateUrl: 'app/views/BlogDireitodosConcursos/post.html',
            controller: 'PostsDireitodosConcursosCtrl'
        })
        .when('/blogdireitodosconcursos/pesquisar/:coluna/:name', {
            templateUrl: 'app/views/BlogDireitodosConcursos/postparameter.html',
            controller: 'PostsDireitodosConcursosCtrl'
        })
        .when('/camposdeinteresse/:urlcampo', {
            templateUrl: 'app/views/CamposdeInteresse/interesses.html',
            controller: 'CamposdeInteresseCtrl'
        })
        .when('/segmentos/:urlsegmento', {
            templateUrl: 'app/views/Segmentos/segmentos.html',
            controller: 'SegmentosCtrl'
        })
        .when('/advogados', {
            templateUrl: 'app/views/Advogados/advogados.html',
        })
        .when('/enderecos', {
            templateUrl: 'app/views/Enderecos/enderecos.html',
        })
        .otherwise({
            redirectTo: '/'
        });

    //$locationProvider.html5Mode(true);
});

app.handleSuccess =
    function (response) {
        return (response.data);
    };

app.handleError =
    function (response) {
        return response.data.message;
    };
