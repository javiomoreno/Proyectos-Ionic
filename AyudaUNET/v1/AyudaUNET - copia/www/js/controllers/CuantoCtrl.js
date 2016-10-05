/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app.controller('CuantoCtrl', function($scope, $stateParams, $ionicLoading, $ionicPopover) {

  // .fromTemplate() method
  var template = '<ion-popover-view style="height: 135px !important;">' +
    '   <ion-content class="padding">' +
    '     <div class="list">' +
    '        <a class="item" href="#/app/nuevosemestre">' +
    '         Nueva Materia' +
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

  $scope.materia = {};
  $scope.materia.cantParciales = $stateParams.id;
  $scope.materia.notaUno = '';
  $scope.materia.notaDos = '';
  $scope.materia.notaTres = '';
  $scope.materia.porceUno = '';
  $scope.materia.porceDos = '';
  $scope.materia.porceTres = '';

  $scope.vector = {};
  $scope.vector._tabla = new Array(100);
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
    $scope.vector._tabla[j] = _numero/10;
  }

  $scope.onCalcular = function (res) {
    if($scope.materia.cantParciales == 2){
      if((angular.isUndefined($scope.materia.porceUno) || angular.isUndefined($scope.materia.notaUno))
        || ($scope.materia.porceUno == null || $scope.materia.notaUno == null)
        || ($scope.materia.porceUno == '' || $scope.materia.notaUno == '')){
        $ionicLoading.show({ template: 'Todos los campos son Obligatorios!', noBackdrop: true, duration: 3000 });
      }
      else {
        if(($scope.materia.notaUno > 100 || $scope.materia.notaUno < 0)){
          $ionicLoading.show({ template: 'Las Materias deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
        }
        else{
          if (($scope.materia.porceUno > 100 || $scope.materia.porceUno < 0)){
            $ionicLoading.show({ template: 'Los Porcentajes deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
          }
          else{
            console.log("Acumulado: "+($scope.materia.porceUno/100 * $scope.DevolverPosicion(parseInt($scope.materia.notaUno))));
          }
        }
      }

    }
    else if($scope.materia.cantParciales == 3){
      if(($scope.materia.porceUno == null || $scope.materia.notaUno == null || $scope.materia.porceDos == null || $scope.materia.notaDos == null)
        || (angular.isUndefined($scope.materia.porceUno) || angular.isUndefined($scope.materia.notaUno) || angular.isUndefined($scope.materia.notaDos) || angular.isUndefined($scope.materia.porceDos))
        || ($scope.materia.porceUno == '' || $scope.materia.notaUno == '' || $scope.materia.porceDos == '' || $scope.materia.notaDos == '')){
        $ionicLoading.show({ template: 'Todos los campos son Obligatorios!', noBackdrop: true, duration: 3000 });
      }
      else{
        if($scope.materia.notaUno > 100 || $scope.materia.notaUno < 0 || $scope.materia.notaDos > 100 || $scope.materia.notaDos < 0){
          $ionicLoading.show({ template: 'Las Materias deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
        }
        else{
          if ($scope.materia.porceUno > 100 || $scope.materia.porceUno < 0 || $scope.materia.porceDos > 100 || $scope.materia.porceDos < 0){
            $ionicLoading.show({ template: 'Los Porcentajes deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
          }
          else{
            if((parseInt($scope.materia.porceUno) + parseInt($scope.materia.porceDos)) > 100){
              $ionicLoading.show({ template: 'La suma de los Porcentajes debe ser menor a 100!', noBackdrop: true, duration: 3000 });
            }
            else{
              console.log("fino");
            }
          }
        }
      }
    }
    else if($scope.materia.cantParciales == 4){
      if((angular.isUndefined($scope.materia.porceUno) || angular.isUndefined($scope.materia.notaUno) || angular.isUndefined($scope.materia.notaDos) || angular.isUndefined($scope.materia.porceDos) || angular.isUndefined($scope.materia.notaTres) || angular.isUndefined($scope.materia.porceTres))
        || ($scope.materia.porceUno == null || $scope.materia.notaUno == null || $scope.materia.porceDos == null || $scope.materia.notaDos == null || $scope.materia.porceTres == null || $scope.materia.notaTres == null)
        || ($scope.materia.porceUno == '' || $scope.materia.notaUno == '' || $scope.materia.porceDos == '' || $scope.materia.notaDos == '' || $scope.materia.porceTres == '' || $scope.materia.notaTres == '')){
        $ionicLoading.show({ template: 'Todos los campos son Obligatorios!', noBackdrop: true, duration: 3000 });
      }
      else{
        if($scope.materia.notaUno > 100 || $scope.materia.notaUno < 0 || $scope.materia.notaDos > 100 || $scope.materia.notaDos < 0 || $scope.materia.notaTres > 100 || $scope.materia.notaTres < 0){
          $ionicLoading.show({ template: 'Las Materias deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
        }
        else{
          if ($scope.materia.porceUno > 100 || $scope.materia.porceUno < 0 || $scope.materia.porceDos > 100 || $scope.materia.porceDos < 0 || $scope.materia.porceTres > 100 || $scope.materia.porceTres < 0){
            $ionicLoading.show({ template: 'Los Porcentajes deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
          }
          else{
            if((parseInt($scope.materia.porceUno) + parseInt($scope.materia.porceDos) + parseInt($scope.materia.porceTres)) > 100){
              $ionicLoading.show({ template: 'La suma de los Porcentajes debe ser menor a 100!', noBackdrop: true, duration: 3000 });
            }
            else{
              console.log("fino");
            }
          }
        }
      }
    }
  }

  $scope.DevolverNota = function(numero)
  {
    console.log("nota. "+numero)
    if(numero > 9.0)
      return -1;
    if(numero == 0)
      return 0;
    this._nota = 0;
    for (var i = 0; i <= 100; i++)
    {
      if($scope.vector._tabla[i] == numero)
      {
        this._nota = i;
        break;
      }
    }
    return this._nota;
  }

  $scope.DevolverPosicion = function(numero){
    return $scope.vector._tabla[numero];
  }
});
