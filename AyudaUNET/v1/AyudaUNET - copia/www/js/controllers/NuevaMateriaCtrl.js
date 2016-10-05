/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app.controller('NuevaMateriaCtrl', function($scope, $state, $cordovaSQLite, $rootScope) {

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

  $scope.items = [
    {nombre:'1 Parcial', value:'1'},
    {nombre:'2 Parciales', value:'2'},
    {nombre:'3 Parciales', value:'3'},
    {nombre:'4 Parciales', value:'4'}
  ];

  $scope.insert = function() {
    if($scope.nueva.cantParciales.value == 1){
      if(($scope.nueva.notaUno > 100 || $scope.nueva.notaUno < 0)
        || ($scope.nueva.porceUno > 100 || $scope.nueva.porceUno < 0)
        || (angular.isUndefined($scope.nueva.porceUno))
        || ($scope.nueva.porceUno == null)
        || ($scope.nueva.porceUno == '')){
        console.log("Error.!!");
      }
      else{
        var query = "INSERT INTO materias (nombre, cant_parciales, porceUno, porceDos, porceTres, porceCuatro, notaUno, notaDos, notaTres, notaCuatro, semestre_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        $cordovaSQLite.execute(db, query, [$scope.nueva.nombre, $scope.nueva.cantParciales.value, $scope.nueva.porceUno, $scope.nueva.porceDos, $scope.nueva.porceTres, $scope.nueva.porceCuatro, $scope.nueva.notaUno, $scope.nueva.notaDos, $scope.nueva.notaTres, $scope.nueva.notaCuatro, $rootScope.semestre.id]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
          console.error(err);
        });
        $state.go('app.guarda');
      }
    }
    else if($scope.nueva.cantParciales.value == 2){
      if(($scope.nueva.notaUno > 100 || $scope.nueva.notaUno < 0 || $scope.nueva.notaDos > 100 || $scope.nueva.notaDos < 0)
        || ($scope.nueva.porceUno > 100 || $scope.nueva.porceUno < 0 || $scope.nueva.porceDos > 100 || $scope.nueva.porceDos < 0)
        || ((parseInt($scope.nueva.porceUno) + parseInt($scope.nueva.porceDos)) > 100)
        || (angular.isUndefined($scope.nueva.porceUno) || angular.isUndefined($scope.nueva.porceDos))
        || ($scope.nueva.porceUno == null || $scope.nueva.porceDos == null)
        || ($scope.nueva.porceUno == '' || $scope.nueva.porceDos == '')){
        console.log("Error.!!");
      }
      else{
        var query = "INSERT INTO materias (nombre, cant_parciales, porceUno, porceDos, porceTres, porceCuatro, notaUno, notaDos, notaTres, notaCuatro, semestre_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        $cordovaSQLite.execute(db, query, [$scope.nueva.nombre, $scope.nueva.cantParciales.value, $scope.nueva.porceUno, $scope.nueva.porceDos, $scope.nueva.porceTres, $scope.nueva.porceCuatro, $scope.nueva.notaUno, $scope.nueva.notaDos, $scope.nueva.notaTres, $scope.nueva.notaCuatro, $rootScope.semestre.id]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
          console.error(err);
        });
        $state.go('app.guarda');
      }
    }
    else if($scope.nueva.cantParciales.value == 3){
      if(($scope.nueva.notaUno > 100 || $scope.nueva.notaUno < 0 || $scope.nueva.notaDos > 100 || $scope.nueva.notaDos < 0 || $scope.nueva.notaTres > 100 || $scope.nueva.notaTres < 0)
        || ($scope.nueva.porceUno > 100 || $scope.nueva.porceUno < 0 || $scope.nueva.porceDos > 100 || $scope.nueva.porceDos < 0 || $scope.nueva.porceTres > 100 || $scope.nueva.porceTres < 0)
        || ((parseInt($scope.nueva.porceUno) + parseInt($scope.nueva.porceDos) + parseInt($scope.nueva.porceTres)) > 100)
        || (angular.isUndefined($scope.nueva.porceUno) || angular.isUndefined($scope.nueva.porceDos) || angular.isUndefined($scope.nueva.porceTres))
        || ($scope.nueva.porceUno == null || $scope.nueva.porceDos == null || $scope.nueva.porceTres == null)
        || ($scope.nueva.porceUno == '' || $scope.nueva.porceDos == '' || $scope.nueva.porceTres == '')){
        console.log("Error.!!");
      }
      else{
        var query = "INSERT INTO materias (nombre, cant_parciales, porceUno, porceDos, porceTres, porceCuatro, notaUno, notaDos, notaTres, notaCuatro, semestre_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        $cordovaSQLite.execute(db, query, [$scope.nueva.nombre, $scope.nueva.cantParciales.value, $scope.nueva.porceUno, $scope.nueva.porceDos, $scope.nueva.porceTres, $scope.nueva.porceCuatro, $scope.nueva.notaUno, $scope.nueva.notaDos, $scope.nueva.notaTres, $scope.nueva.notaCuatro, $rootScope.semestre.id]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
          console.error(err);
        });
        $state.go('app.guarda');
      }
    }
    else if($scope.nueva.cantParciales.value == 4){
      if(($scope.nueva.notaUno > 100 || $scope.nueva.notaUno < 0 || $scope.nueva.notaDos > 100 || $scope.nueva.notaDos < 0 || $scope.nueva.notaTres > 100 || $scope.nueva.notaTres < 0 || $scope.nueva.notaCuatro > 100 || $scope.nueva.notaCuatro < 0)
        || ($scope.nueva.porceUno > 100 || $scope.nueva.porceUno < 0 || $scope.nueva.porceDos > 100 || $scope.nueva.porceDos < 0 || $scope.nueva.porceTres > 100 || $scope.nueva.porceTres < 0 || $scope.nueva.porceCuatro > 100 || $scope.nueva.porceCuatro < 0)
        || ((parseInt($scope.nueva.porceUno) + parseInt($scope.nueva.porceDos) + parseInt($scope.nueva.porceTres) + parseInt($scope.nueva.porceCuatro)) > 100)
        || (angular.isUndefined($scope.nueva.porceUno) || angular.isUndefined($scope.nueva.porceDos) || angular.isUndefined($scope.nueva.porceTres) || angular.isUndefined($scope.nueva.porceCuatro))
        || ($scope.nueva.porceUno == null || $scope.nueva.porceDos == null || $scope.nueva.porceTres == null || $scope.nueva.porceCuatro == null)
        || ($scope.nueva.porceUno == '' || $scope.nueva.porceDos == '' || $scope.nueva.porceTres == '' || $scope.nueva.porceCuatro == '')){
        console.log("Error.!!");
      }
      else{
        var query = "INSERT INTO materias (nombre, cant_parciales, porceUno, porceDos, porceTres, porceCuatro, notaUno, notaDos, notaTres, notaCuatro, semestre_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        $cordovaSQLite.execute(db, query, [$scope.nueva.nombre, $scope.nueva.cantParciales.value, $scope.nueva.porceUno, $scope.nueva.porceDos, $scope.nueva.porceTres, $scope.nueva.porceCuatro, $scope.nueva.notaUno, $scope.nueva.notaDos, $scope.nueva.notaTres, $scope.nueva.notaCuatro, $rootScope.semestre.id]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
          console.error(err);
        });
        $state.go('app.guarda');
      }
    }
  }

});
