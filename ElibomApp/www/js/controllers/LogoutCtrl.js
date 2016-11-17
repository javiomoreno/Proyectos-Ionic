app.controller('LogoutCtrl', function($scope, $state) {
    $scope.login = function(){
    $state.go('tab.home');
  }
});