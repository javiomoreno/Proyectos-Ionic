/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app.controller('NuevaMateriaCtrl', function($scope, $state, $cordovaSQLite, $rootScope, $ionicLoading, Materias) {

  $scope.nueva = {};
  $scope.nueva.nombre = "";
  $scope.nueva.cantParciales = {};
  $scope.nueva.notaUno = "";
  $scope.nueva.notaDos = "";
  $scope.nueva.notaTres = "";
  $scope.nueva.notaCuatro = "";
  $scope.nueva.porceUno = "";
  $scope.nueva.porceDos = "";
  $scope.nueva.porceTres = "";
  $scope.nueva.porceCuatro = "";
  $scope.nueva.semestre_id = "";

  $scope.items = [
    {nombre:'1 Parcial', value:'1'},
    {nombre:'2 Parciales', value:'2'},
    {nombre:'3 Parciales', value:'3'},
    {nombre:'4 Parciales', value:'4'}
  ];

  $scope.insert = function() {
    if($scope.nueva.cantParciales.value == 1){
      if(($scope.nueva.porceUno == null) || ($scope.nueva.porceUno == '') || (angular.isUndefined($scope.nueva.porceUno)) || ($scope.nueva.nombre == null) || ($scope.nueva.nombre == '') || (angular.isUndefined($scope.nueva.nombre))){
        $ionicLoading.show({ template: 'El Porcentaje y el Nombre de la materia son Obligatorios!', noBackdrop: true, duration: 3000 });
      }else {
        if (($scope.nueva.notaUno > 100 || $scope.nueva.notaUno < 0)){
          $ionicLoading.show({ template: 'La Nota deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
        }else{
          if($scope.nueva.porceUno != 100) {
            $ionicLoading.show({ template: 'El porcentaje debe ser igual a 100!', noBackdrop: true, duration: 3000 });
          }else{
            $scope.nueva.semestre_id = $rootScope.semestre.id;
            Materias.add($scope.nueva);
            $state.go('app.guarda');
          }
        }
      }
    }
    else if($scope.nueva.cantParciales.value == 2){
      if(($scope.nueva.porceUno == null) || ($scope.nueva.porceUno == '') || (angular.isUndefined($scope.nueva.porceUno))
          || ($scope.nueva.porceDos == null) || ($scope.nueva.porceDos == '') || (angular.isUndefined($scope.nueva.porceDos))
          || ($scope.nueva.nombre == null) || ($scope.nueva.nombre == '') || (angular.isUndefined($scope.nueva.nombre))){
        $ionicLoading.show({ template: 'Los Porcentajes y el Nombre de la materia son Obligatorios!', noBackdrop: true, duration: 3000 });
      }else {
        if (($scope.nueva.notaUno > 100 || $scope.nueva.notaUno < 0) || ($scope.nueva.notaDos > 100 || $scope.nueva.notaDos < 0)){
          $ionicLoading.show({ template: 'Las Notas deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
        }else{
          if((parseInt($scope.nueva.porceUno) + parseInt($scope.nueva.porceDos)) != 100) {
            $ionicLoading.show({ template: 'Los porcentajes deben ser igual a 100!', noBackdrop: true, duration: 3000 });
          }else{
            $scope.nueva.semestre_id = $rootScope.semestre.id;
            Materias.add($scope.nueva);
            $state.go('app.guarda');
          }
        }
      }
    }
    else if($scope.nueva.cantParciales.value == 3){
      if(($scope.nueva.porceUno == null) || ($scope.nueva.porceUno == '') || (angular.isUndefined($scope.nueva.porceUno))
        || ($scope.nueva.porceDos == null) || ($scope.nueva.porceDos == '') || (angular.isUndefined($scope.nueva.porceDos))
        || ($scope.nueva.porceTres == null) || ($scope.nueva.porceTres == '') || (angular.isUndefined($scope.nueva.porceTres))
        || ($scope.nueva.nombre == null) || ($scope.nueva.nombre == '') || (angular.isUndefined($scope.nueva.nombre))){
        $ionicLoading.show({ template: 'Los Porcentajes y el Nombre de la materia son Obligatorios!', noBackdrop: true, duration: 3000 });
      }else {
        if (($scope.nueva.notaUno > 100 || $scope.nueva.notaUno < 0) || ($scope.nueva.notaDos > 100 || $scope.nueva.notaDos < 0) || ($scope.nueva.notaTres > 100 || $scope.nueva.notaTres < 0)){
          $ionicLoading.show({ template: 'Las Notas deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
        }else{
          if((parseInt($scope.nueva.porceUno) + parseInt($scope.nueva.porceDos) + parseInt($scope.nueva.porceTres)) != 100) {
            $ionicLoading.show({ template: 'Los porcentajes deben ser igual a 100!', noBackdrop: true, duration: 3000 });
          }else{
            $scope.nueva.semestre_id = $rootScope.semestre.id;
            Materias.add($scope.nueva);
            $state.go('app.guarda');
          }
        }
      }
    }
    else if($scope.nueva.cantParciales.value == 4){
      if(($scope.nueva.porceUno == null) || ($scope.nueva.porceUno == '') || (angular.isUndefined($scope.nueva.porceUno))
        || ($scope.nueva.porceDos == null) || ($scope.nueva.porceDos == '') || (angular.isUndefined($scope.nueva.porceDos))
        || ($scope.nueva.porceTres == null) || ($scope.nueva.porceTres == '') || (angular.isUndefined($scope.nueva.porceTres))
        || ($scope.nueva.porceCuatro == null) || ($scope.nueva.porceCuatro == '') || (angular.isUndefined($scope.nueva.porceCuatro))
        || ($scope.nueva.nombre == null) || ($scope.nueva.nombre == '') || (angular.isUndefined($scope.nueva.nombre))){
        $ionicLoading.show({ template: 'Los Porcentajes y el Nombre de la materia son Obligatorios!', noBackdrop: true, duration: 3000 });
      }else {
        if (($scope.nueva.notaUno > 100 || $scope.nueva.notaUno < 0) || ($scope.nueva.notaDos > 100 || $scope.nueva.notaDos < 0) || ($scope.nueva.notaTres > 100 || $scope.nueva.notaTres < 0) || ($scope.nueva.notaCuatro > 100 || $scope.nueva.notaCuatro < 0)){
          $ionicLoading.show({ template: 'Las Notas deben estar entre 0 y 100!', noBackdrop: true, duration: 3000 });
        }else{
          if((parseInt($scope.nueva.porceUno) + parseInt($scope.nueva.porceDos) + parseInt($scope.nueva.porceTres) + parseInt($scope.nueva.porceCuatro)) != 100) {
            $ionicLoading.show({ template: 'Los porcentajes deben ser igual a 100!', noBackdrop: true, duration: 3000 });
          }else{
            $scope.nueva.semestre_id = $rootScope.semestre.id;
            Materias.add($scope.nueva);
            $state.go('app.guarda');
          }
        }
      }
    }
    else{
      $ionicLoading.show({ template: 'Seleccione Cantidad de Parciales!', noBackdrop: true, duration: 3000 });
    }
  }

});
