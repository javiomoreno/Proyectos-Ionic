// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.inicio', {
      url: '/inicio',
      views: {
        'menuContent': {
          templateUrl: 'templates/inicio.html',
          controller: 'InicioCtrl'
        }
      }
    })

  .state('app.contacto', {
      url: '/contacto',
      views: {
        'menuContent': {
          templateUrl: 'templates/contacto.html'
        }
      }
    })

    .state('app.quehacemos', {
      url: '/quehacemos',
      views: {
        'menuContent': {
          templateUrl: 'templates/quehacemos.html',
          controller: 'QueHacemosCtrl'
        }
      }
    })

    .state('app.equipotrabajo', {
      url: '/equipotrabajo',
      views: {
        'menuContent': {
          templateUrl: 'templates/equipotrabajo.html',
          controller: 'EquipoTrabajoCtrl'
        }
      }
    })

    .state('app.detallequehacemos', {
      url: '/detallequehacemos/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/detallequehacemos.html',
          controller: 'DetalleQueHacemosCtrl'
        }
      }
    })

    .state('app.profile', {
      url: '/profile/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inicio');
});
