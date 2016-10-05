app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $state, $ionicHistory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.showAlert = function() {

    $scope.data = {};

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    var promptPopup = $ionicPopup.prompt({
      title: '¿Cantidad de Parciales?',
      template: '<ion-radio ng-model="data.select" ng-value="2">2 Parciales</ion-radio><ion-radio ng-model="data.select" ng-value="3">3 Parciales</ion-radio><ion-radio ng-model="data.select" ng-value="4">4 Parciales</ion-radio>',
      scope: $scope,
      buttons: [
        { text: 'Cancelar',
          onTap: function(e) {
            return "null";
          }
        },
        {
          text: '<b>Ok</b>',
          type: 'button-positive',
          onTap: function(e) {
            if ($scope.data.select != undefined) {
              return $scope.data.select;
            }
            else{
              return "null";
            }
          }
        }
      ]
    });

    promptPopup.then(function(res) {
      if(res == 'null'){
        $state.go('app.inicio');
      }
      else{
        $state.go('app.cuanto', {id: res});
      }
    });
  };
});
