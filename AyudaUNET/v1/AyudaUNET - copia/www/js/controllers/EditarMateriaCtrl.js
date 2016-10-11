/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app  .controller('EditarMateriaCtrl', function($scope, $state, $cordovaSQLite, $stateParams, $ionicLoading, Materias) {

  $scope.materia = {};

  var query = "SELECT * FROM materias WHERE id = ?";
  $cordovaSQLite.execute(db, query, [$stateParams.id]).then(function (res) {
    if (res.rows.length > 0){
      $scope.materia = res.rows.item(0);
    }});

  $scope.actualizar = function(){
    if($scope.materia.cant_parciales == 1) {
      if (($scope.materia.porceUno == null) || ($scope.materia.porceUno == '') || (angular.isUndefined($scope.materia.porceUno)) || ($scope.materia.nombre == null) || ($scope.materia.nombre == '') || (angular.isUndefined($scope.materia.nombre))) {
        $ionicLoading.show({template: 'El Porcentaje y el Nombre de la materia son Obligatorios!', noBackdrop: true, duration: 3000});
      } else {
        if (($scope.materia.notaUno > 100 || $scope.materia.notaUno < 0)) {
          $ionicLoading.show({template: 'La Nota deben estar entre 0 y 100!', noBackdrop: true, duration: 3000});
        } else {
          if ($scope.materia.porceUno != 100) {
            $ionicLoading.show({template: 'El porcentaje debe ser igual a 100!', noBackdrop: true, duration: 3000});
          } else {
            Materias.update($scope.materia);
            $state.go('app.detallemateria', {id: $scope.materia.id});
          }
        }
      }
    }
    else if($scope.materia.cant_parciales == 2) {
      if(($scope.materia.porceUno == null) || ($scope.materia.porceUno == '') || (angular.isUndefined($scope.materia.porceUno))
        || ($scope.materia.porceDos == null) || ($scope.materia.porceDos == '') || (angular.isUndefined($scope.materia.porceDos))
        || ($scope.materia.nombre == null) || ($scope.materia.nombre == '') || (angular.isUndefined($scope.materia.nombre))){
        $ionicLoading.show({ template: 'Los Porcentajes y el Nombre de la materia son Obligatorios!', noBackdrop: true, duration: 3000 });
      }else {
        if (($scope.materia.notaUno > 100 || $scope.materia.notaUno < 0) || ($scope.materia.notaDos > 100 || $scope.materia.notaDos < 0)){
          $ionicLoading.show({ template: 'Las Notas deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
        }else{
          if((parseInt($scope.materia.porceUno) + parseInt($scope.materia.porceDos)) != 100) {
            $ionicLoading.show({ template: 'Los porcentajes deben ser igual a 100!', noBackdrop: true, duration: 3000 });
          }else{
            Materias.update($scope.materia);
            $state.go('app.detallemateria', {id: $scope.materia.id});
          }
        }
      }
    }
    else if($scope.materia.cant_parciales == 3) {
      if(($scope.materia.porceUno == null) || ($scope.materia.porceUno == '') || (angular.isUndefined($scope.materia.porceUno))
        || ($scope.materia.porceDos == null) || ($scope.materia.porceDos == '') || (angular.isUndefined($scope.materia.porceDos))
        || ($scope.materia.porceTres == null) || ($scope.materia.porceTres == '') || (angular.isUndefined($scope.materia.porceTres))
        || ($scope.materia.nombre == null) || ($scope.materia.nombre == '') || (angular.isUndefined($scope.materia.nombre))){
        $ionicLoading.show({ template: 'Los Porcentajes y el Nombre de la materia son Obligatorios!', noBackdrop: true, duration: 3000 });
      }else {
        if (($scope.materia.notaUno > 100 || $scope.materia.notaUno < 0) || ($scope.materia.notaDos > 100 || $scope.materia.notaDos < 0) || ($scope.materia.notaTres > 100 || $scope.materia.notaTres < 0)){
          $ionicLoading.show({ template: 'Las Notas deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
        }else{
          if((parseInt($scope.materia.porceUno) + parseInt($scope.materia.porceDos) + parseInt($scope.materia.porceTres)) != 100) {
            $ionicLoading.show({ template: 'Los porcentajes deben ser igual a 100!', noBackdrop: true, duration: 3000 });
          }else{
            Materias.update($scope.materia);
            $state.go('app.detallemateria', {id: $scope.materia.id});
          }
        }
      }
    }
    else if($scope.materia.cant_parciales == 4) {
      if(($scope.materia.porceUno == null) || ($scope.materia.porceUno == '') || (angular.isUndefined($scope.materia.porceUno))
        || ($scope.materia.porceDos == null) || ($scope.materia.porceDos == '') || (angular.isUndefined($scope.materia.porceDos))
        || ($scope.materia.porceTres == null) || ($scope.materia.porceTres == '') || (angular.isUndefined($scope.materia.porceTres))
        || ($scope.materia.porceCuatro == null) || ($scope.materia.porceCuatro == '') || (angular.isUndefined($scope.materia.porceCuatro))
        || ($scope.materia.nombre == null) || ($scope.materia.nombre == '') || (angular.isUndefined($scope.materia.nombre))){
        $ionicLoading.show({ template: 'Los Porcentajes y el Nombre de la materia son Obligatorios!', noBackdrop: true, duration: 3000 });
      }else {
        if (($scope.materia.notaUno > 100 || $scope.materia.notaUno < 0) || ($scope.materia.notaDos > 100 || $scope.materia.notaDos < 0) || ($scope.materia.notaTres > 100 || $scope.materia.notaTres < 0) || ($scope.materia.notaCuatro > 100 || $scope.materia.notaCuatro < 0)){
          $ionicLoading.show({ template: 'Las Notas deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
        }else{
          if((parseInt($scope.materia.porceUno) + parseInt($scope.materia.porceDos) + parseInt($scope.materia.porceTres) + parseInt($scope.materia.porceCuatro)) != 100) {
            $ionicLoading.show({ template: 'Los porcentajes deben ser igual a 100!', noBackdrop: true, duration: 3000 });
          }else{
            Materias.update($scope.materia);
            $state.go('app.detallemateria', {id: $scope.materia.id});
          }
        }
      }
    }
  }
});
