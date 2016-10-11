/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app.controller('SettingsCtrl', function($scope,$state,sharedConn) {

  $scope.logout=function(){
    console.log("T");
    sharedConn.logout();
    $state.go('login', {}, {location: "replace", reload: true});
  };
})
