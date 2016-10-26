/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app.controller('ChatDetailCtrl', function($scope, $timeout, $ionicScrollDelegate, sharedConn, ChatDetails, Chats) {

  $scope.hideTime = true;
  $scope.data = {};
  $scope.myId = sharedConn.getConnectObj().jid;
  $scope.messages = [];

  $scope.to_id=ChatDetails.getTo();
  
  $scope.messages = Chats.allRoster($scope.to_id);

  var isIOS = ionic.Platform.isIOS();

  $scope.sendMsg=function(to,body){
    var to_jid  = Strophe.getBareJidFromJid(to)+'@appchat.com';
    var timestamp = new Date().getTime();
    var reqChannelsItems = $msg({id:timestamp, to:to_jid, type: 'chat' })
      .c("body").t(body);
    sharedConn.getConnectObj().send(reqChannelsItems.tree());
  };

  $scope.showSendMessage = function() {

    $scope.sendMsg($scope.to_id,$scope.data.message);

    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      userId: $scope.myId,
      text: $scope.data.message,
      time: d
    });

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };

  $scope.messageRecieve=function(msg){
    console.log(msg);

    //  var to = msg.getAttribute('to');
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');

    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    if (type == "chat" && elems.length > 0) {

      var body = elems[0];
      var textMsg = Strophe.getText(body);


      $scope.messages.push({
        userId: from,
        text: textMsg,
        time: d
      });

      $ionicScrollDelegate.scrollBottom(true);
      $scope.$apply();

      console.log($scope.messages);
      console.log('Message recieved from ' + from + ': ' + textMsg);
    }

  }

  $scope.$on('msgRecievedBroadcast', function(event, data) {
    $scope.messageRecieve(data);
  })

  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };
});
