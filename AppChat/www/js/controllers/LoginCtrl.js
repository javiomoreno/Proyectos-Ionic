/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app.controller('LoginCtrl', function($scope , sharedConn, $state ) {

  var XMPP_DOMAIN  = 'xvamp'; // Domain we are going to be connected to.
  var xmpp_user    = 'admin';     // xmpp user name
  var xmpp_pass    = 'admin';

  $scope.goToRegister=function(){
    $state.go('register', {}, {location: "replace", reload: true});
  }


  $scope.login=function(user){
    sharedConn.login(user.jid,XMPP_DOMAIN,user.pass);
  }



  //sharedConn.login(xmpp_user,XMPP_DOMAIN,xmpp_pass);
});
