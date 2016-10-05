/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app .controller('TablaCtrl', function($scope, $ionicPopup, $ionicLoading, $ionicPopover) {

  // .fromTemplate() method
  var template = '<ion-popover-view style="height: 60px !important;">' +
    '   <ion-content>' +
    '     <div class="list">' +
      '      <a class="item" href="#/app/nuevosemestre">' +
      '         Ayuda' +
      '      </a>' +
    '     </div>' +
    '   </ion-content>' +
    '</ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });
  $scope.closePopover = function () {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.popover.remove();
  });

  $scope.showAlert = function(nota) {

    if(angular.isUndefined(nota) || nota == null || nota == ''){
      $ionicLoading.show({template: 'Ingrese Nota para Calcular!', noBackdrop: true, duration: 3000});
    }
    else {
      if (nota > 100 || nota < 0) {
        $ionicLoading.show({template: 'La  Nota debe estar entre 0 y 100!', noBackdrop: true, duration: 3000});
      }
      else {
        var _tabla = new Array(100);
        var _numero = 0;

        for (var j = 0; j <= 100; j++)
        {
          if(j < 8)
            _numero = 10;
          else if(j == 17 || j == 18)
            _numero = 20;
          else if(j == 28 || j == 29)
            _numero = 30;
          else if(j == 39 || j == 40)
            _numero = 40;
          else if(j == 48 || j == 49)
            _numero = 48;
          else if(j == 54 || j == 55)
            _numero = 53;
          else if(j == 62 || j == 63)
            _numero = 60;
          else if(j == 73 || j == 74)
            _numero = 70;
          else if(j == 84 || j == 85)
            _numero = 80;
          else if(j > 94)
            _numero = 90;
          else
            _numero ++;
          _tabla[j] = _numero/10;
        }

        var alertPopup = $ionicPopup.alert({
          title: 'Tabla de Conversión!',
          template: 'El Resultado es: '+_tabla[nota],
        });

        alertPopup.then(function(res) {

        });
      }
    }
  };
});
