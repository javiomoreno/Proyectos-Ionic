/**
 * Created by Javier Moreno on 10/17/2016.
 */
app.controller('SMSController', function($scope, $cordovaSms) {
  document.addEventListener("deviceready", function() {

    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: '' // send SMS with the native android SMS messaging
        //intent: '' // send SMS without open any other app
        //intent: 'INTENT' // send SMS inside a default SMS app
      }
    };

    $scope.sendSMS = function() {

      $cordovaSms
        .send('0959052082', 'This is some dummy text', options)
        .then(function() {
          alert('Success');
          // Success! SMS was sent
        }, function(error) {
          alert('Error');
          // An error occurred
        });
    }
  });
});
