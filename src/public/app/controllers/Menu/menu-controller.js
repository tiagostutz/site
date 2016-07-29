'use strict';

app.controller('MenuController', function($scope, $location) {
  $scope.menuClass = function(page) {
    var current = $location.path();
    if (page.indexOf(';') === -1) {
      return current.indexOf(`/${page}`) !== -1 ? 'active' : '';
    }else{
      var arrPages = page.split(';');
      for(var i=0; i<arrPages.length; i++) {
        if (current.indexOf(arrPages[i]) !== -1) {
          return 'active';
        }
      }
      return '';
    }
  };
});
