/*global app*/
'use strict';

app.controller('Contact', ['$scope', 'ContactService',
    function ($scope, $route, $rootScope, config) {
       $rootScope.seo = {
            pageTitle: "Contato",
            pageDescription: "A defesa dos servidores públicos, do concurso à aposentadoria.",
            pageURL: config.siteUrl + "#!/contato/"
        };
    }
]);