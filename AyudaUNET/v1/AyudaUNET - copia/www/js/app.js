// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;
var app = angular.module('starter', ['ionic', 'ion-floating-menu', 'ngCordova']);
app.run(function($ionicPlatform, $cordovaSQLite) {
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
      if (window.cordova) {
        db = $cordovaSQLite.openDB({ name: "my.db", iosDatabaseLocation:'default' }); //device
      }else{
        db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
      }

      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS materias (id integer primary key, nombre text, cant_parciales integer, porceUno float, porceDos float, porceTres float, porceCuatro float, notaUno integer, notaDos integer, notaTres integer, notaCuatro integer, semestre_id integer)");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS semestres (id integer primary key, nombre text, fechaRegistro text)");
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

      .state('app.tabla', {
        url: '/tabla',
        views: {
          'menuContent': {
            templateUrl: 'templates/tabla.html',
            controller: 'TablaCtrl'
          }
        }
      })

      .state('app.cuanto', {
        url: '/cuanto/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/cuanto.html',
            controller: 'CuantoCtrl'
          }
        }
      })

      .state('app.guarda', {
        url: '/guarda',
        views: {
          'menuContent': {
            templateUrl: 'templates/guarda.html',
            controller: 'GuardaCtrl',
          }
        }
      })

      .state('app.detallemateria', {
        url: '/detallemateria/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/detallemateria.html',
            controller: 'DetalleMateriaCtrl'
          }
        }
      })

      .state('app.nuevamateria', {
        url: '/nuevamateria',
        views: {
          'menuContent': {
            templateUrl: 'templates/nuevamateria.html',
            controller: 'NuevaMateriaCtrl'
          }
        }
      })

      .state('app.editarmateria', {
        url: '/editarmateria/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/editarmateria.html',
            controller: 'EditarMateriaCtrl'
          }
        }
      })

    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/inicio');
  });
