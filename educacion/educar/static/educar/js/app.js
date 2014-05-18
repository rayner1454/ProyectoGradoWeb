/*Declaramos nuestras variabless de usarlas en angulasjs*/

var educa=angular.module('educacion',['restangular']);

/*A continuacion configuramos la sintaxis de angular para que no tenga confusion 
  con Django*/

  educa.config(function($interpolateProvider, RestangularProvider) {
  		$interpolateProvider.startSymbol('{[{');
  		$interpolateProvider.endSymbol('}]}');
      
      educa.config(function ($routeProvider){
        $routeProvider.when("/",{
          controller:'Listactrl',  
          templateUrl:'partials/registrar-alumno.html'
        })
      });

  		RestangularProvider.setBaseUrl('http://127.0.0.1:8000/api/v1.0/');
 		// RestangularProvider.setRequestSuffix('/');
  });
    educa.run(function ($http, $cookies){
  		$http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];
  })

  educa.controller('Listactrl',function($scope,Restangular){
  		$scope.hola='Hola como estas con angular y Django';
  		var lista = Restangular.all();
  		$scope.profesores=lista.getList();
  });