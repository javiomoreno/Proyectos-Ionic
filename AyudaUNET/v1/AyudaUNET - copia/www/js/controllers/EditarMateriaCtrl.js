/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app  .controller('EditarMateriaCtrl', function($scope, $state, $cordovaSQLite, $stateParams) {

  $scope.materia = {};

  var query = "SELECT * FROM materias WHERE id = ?";
  $cordovaSQLite.execute(db, query, [$stateParams.id]).then(function (res) {
    if (res.rows.length > 0){
      $scope.materia = res.rows.item(0);
    }});

  $scope.actualizar = function(){
    var query = "UPDATE materias SET nombre = ?, porceUno = ?, porceDos = ?, porceTres = ?, porceCuatro = ?, notaUno = ?, notaDos = ?, notaTres = ?, notaCuatro = ? WHERE id = ?";
    $cordovaSQLite.execute(db, query, [$scope.materia.nombre, $scope.materia.porceUno, $scope.materia.porceDos, $scope.materia.porceTres, $scope.materia.porceCuatro, $scope.materia.notaUno, $scope.materia.notaDos, $scope.materia.notaTres, $scope.materia.notaCuatro, $scope.materia.id]).then(function (res) {
      console.log(res);
    })
    $state.go('app.detallemateria', {id: $scope.materia.id});
  }
});
