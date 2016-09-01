angular.module('starter.controllers', [])

  .controller('HomeCtrl', function($scope, Service, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
      Service.loginUser($scope.data.username, $scope.data.password).success(function(data) {
        $state.go('tab.inicio');
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error al Entrar!',
          template: 'DNI o Clave Incorrectos!'
        });
      });
    }

    $scope.recuperarClave = function() {
      $state.go('recuperar-clave');
    }
  })

  .controller('RecuperarClaveCtrl', function($scope, $ionicHistory) {
      $scope.myGoBack = function() {
        $ionicHistory.goBack();
      };
  })

  .controller('InicioCtrl', function($scope) {

  });
