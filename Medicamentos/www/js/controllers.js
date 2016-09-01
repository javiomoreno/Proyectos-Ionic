angular.module('starter.controllers', [])

  .controller('AlarmasCtrl', function($scope,  Chats, $state) {
    $scope.myEvent = function () {
      console.log('hola')
      $state.go('tab.nueva-alarma');
    }
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
    $scope.editar = function (chat) {
      //$state.go('tab.alarmas/'+chat.id);
    }
  })

  .controller('AlarmaDetalleCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.alarmaId);
  })


  .controller('NuevaAlarmaCtrl', function($scope) {

  })


  .controller('BuscarCtrl', function($scope) {

  })

  .controller('FarmaciasCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
