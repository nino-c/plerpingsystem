angular.module('Exhibition', [
  'ngRoute',
  'ui.bootstrap',
  'ui.codemirror',
  'ngMaterial',
  'ngMessages',
  'ngResource',
  'ngAnimate',
  'ngCookies'
  ])
  .value('ui.config', {
    codemirror: {
      lineWrapping : true,
      lineNumbers: true,
      indentWithTabs: true,
      theme: "monokai",
      mode: 'javascript',
      matchBrackets: true
    }
  }).config(
    ($mdThemingProvider, $routeProvider, $resourceProvider) => {

      $mdThemingProvider.theme('default')
          .primaryPalette('light-green', {
            'default': '200',
            'hue-1': '100',
            'hue-2': '500',
            'hue-3': 'A200'
          })
          .accentPalette('lime', {
            'default': '500'
          })

      $routeProvider
        .when('/', {
          templateUrl: 'views/app-list.html',
        })
        .when('/apps/:id/', {
          templateUrl: 'views/app-details.html',
        })
        .when('/apps/:id/edit/', {
          templateUrl: 'views/app-editor.html'
        })
        .when('/instance/:app_id/:instance_id/', {
          templateUrl: 'views/app-display.html',
        })
        .otherwise({
          redirectTo: '/',
        })

        $resourceProvider.defaults.stripTrailingSlashes = false;




  })
  .run(function($rootScope, $location, $http, $cookies) {
    $http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken']
    $rootScope.$on( "$routeChangeStart", function($event, next, current) {
          console.log("routechange", $location.path())
          if ($location.path().indexOf('/instance/') == -1) {
            // clear canvas
         
            //$("#big-canvas").css({display:"block"})
            $rootScope.showCanvas = false;
            
          } else {
            //$("#big-canvas").css({display:"none"}) 
            $rootScope.showCanvas = true;
          }
        })
  })