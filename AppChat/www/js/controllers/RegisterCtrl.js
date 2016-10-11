/**
 * Created by Javier Moreno on 8 oct 2016.
 */
app.controller('RegisterCtrl', function($scope , $state , sharedConn ) {

  $scope.goToLogin=function(){
    $state.go('login', {}, {location: "replace", reload: true});
  }
  $scope.reg=function(r){
    sharedConn.register(r.jid,r.pass,r.name);
  }

})
