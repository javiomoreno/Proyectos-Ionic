/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app.controller('ContactsCtrl', function($scope,Contacts,$state,ChatDetails) {

  $scope.contacts = [];

  $scope.contacts = Contacts.allRoster();

  $scope.remove = function(contact) {
    Contacts.removeRoster(chat);
  };


  $scope.chatDetails=function(to_id){
    ChatDetailsObj.setTo(to_id);
    $state.go('app.chatDetalle');
  };


  $scope.add = function(add_jid){
    Contacts.addNewRosterContact(add_jid);
  };

})
