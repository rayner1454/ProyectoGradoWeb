'use strict';
/*Declaramos nuestras variabless de usarlas en angulasjs*/

/*A continuacion configuramos la sintaxis de angular para que no tenga confusion 
  con Django*/
var app = angular.module('educacion', ['restangular', 'ngCookies']).
config(function($interpolateProvider, RestangularProvider) {
  		$interpolateProvider.startSymbol('[[');
  		$interpolateProvider.endSymbol(']]');
      
      RestangularProvider.setBaseUrl("/api/v1.0");
      RestangularProvider.setRequestSuffix('/');
 		// RestangularProvider.setRequestSuffix('/');
  });
app.run(['$rootScope', '$http', '$cookies', '$templateCache',function($rootScope, $http, $cookies, $templateCache) {
  $http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];
  console.log($http.defaults.headers.common['X-CSRFToken']);
  $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    });
}]);



  