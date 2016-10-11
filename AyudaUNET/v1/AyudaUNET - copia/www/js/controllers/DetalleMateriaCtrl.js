/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app.controller('DetalleMateriaCtrl', function($scope, $state, $stateParams, $cordovaSQLite, $ionicPopup, $ionicHistory, Materias) {

  $scope.$on('$ionicView.beforeEnter', function() {

    var _tabla = new Array(100);
    var _numero = 0;

    for (var j = 0; j <= 100; j++) {
      if (j < 8)
        _numero = 10;
      else if (j == 17 || j == 18)
        _numero = 20;
      else if (j == 28 || j == 29)
        _numero = 30;
      else if (j == 39 || j == 40)
        _numero = 40;
      else if (j == 48 || j == 49)
        _numero = 48;
      else if (j == 54 || j == 55)
        _numero = 53;
      else if (j == 62 || j == 63)
        _numero = 60;
      else if (j == 73 || j == 74)
        _numero = 70;
      else if (j == 84 || j == 85)
        _numero = 80;
      else if (j > 94)
        _numero = 90;
      else
        _numero++;
      _tabla[j] = _numero / 10;
    }

    $scope.materia = {};
    $scope.materiasSelf = [];
    $scope.materiasSelf = null;

    Materias.get($stateParams.id).then(function(materia){
      $scope.materiasSelf = materia;

      if ($scope.materiasSelf != undefined) {
        var totalUno, totalDos, totalTres, totalCuatro;
        var notaUno, notaDos, notaTres, notaCuatro;
        if ($scope.materiasSelf.notaUno == "" || angular.isUndefined($scope.materiasSelf.notaUno) || $scope.materiasSelf.notaUno == null) {
          totalUno = 0;
          notaUno = 0;
        }
        else {
          totalUno = _tabla[$scope.materiasSelf.notaUno] * (parseFloat($scope.materiasSelf.porceUno) / 100);
          notaUno = $scope.materiasSelf.notaUno
        }

        if ($scope.materiasSelf.notaDos == "" || angular.isUndefined($scope.materiasSelf.notaDos) || $scope.materiasSelf.notaDos == null) {
          totalDos = 0;
          notaDos = 0;
        }
        else {
          totalDos = _tabla[$scope.materiasSelf.notaDos] * (parseFloat($scope.materiasSelf.porceDos) / 100);
          notaDos = $scope.materiasSelf.notaDos;
        }

        if ($scope.materiasSelf.notaTres == "" || angular.isUndefined($scope.materiasSelf.notaTres) || $scope.materiasSelf.notaTres == null) {
          totalTres = 0;
          notaTres = 0;
        }
        else {
          totalTres = _tabla[$scope.materiasSelf.notaTres] * (parseFloat($scope.materiasSelf.porceTres) / 100);
          notaTres = $scope.materiasSelf.notaTres;
        }

        if ($scope.materiasSelf.notaCuatro == "" || angular.isUndefined($scope.materiasSelf.notaCuatro) || $scope.materiasSelf.notaCuatro == null) {
          totalCuatro = 0;
          notaCuatro = 0;
        }
        else {
          totalCuatro = _tabla[$scope.materiasSelf.notaCuatro] * (parseFloat($scope.materiasSelf.porceCuatro) / 100);
          notaCuatro = $scope.materiasSelf.notaCuatro;
        }

        var acumulado = parseFloat(totalUno) + parseFloat(totalDos) + parseFloat(totalTres) + parseFloat(totalCuatro);
        $scope.materia = {
          id: $scope.materiasSelf.id,
          nombre: $scope.materiasSelf.nombre,
          notaUno: notaUno,
          notaDos: notaDos,
          notaTres: notaTres,
          notaCuatro: notaCuatro,
          porceUno: $scope.materiasSelf.porceUno,
          porceDos: $scope.materiasSelf.porceDos,
          porceTres: $scope.materiasSelf.porceTres,
          porceCuatro: $scope.materiasSelf.porceCuatro,
          totalUno: parseFloat(totalUno).toFixed(2),
          totalDos: parseFloat(totalDos).toFixed(2),
          totalTres: parseFloat(totalTres).toFixed(2),
          totalCuatro: parseFloat(totalCuatro).toFixed(2),
          acumulado: parseFloat(acumulado).toFixed(2),
          notaFinal: Math.round(acumulado),
          cant_parciales: $scope.materiasSelf.cant_parciales
        }

        console.log($scope.materia);
      }
    });
  });

  $scope.showAlert = function() {

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    var promptPopup = $ionicPopup.prompt({
      title: '¿Seguro Desea Eliminar la Materia?',
      template: '',
      scope: $scope,
      buttons: [
        { text: 'No',
          onTap: function(e) {
            return "null";
          }
        },
        {
          text: '<b>Si</b>',
          type: 'button-positive',
          onTap: function(e) {
            return "si";
          }
        }
      ]
    });

    promptPopup.then(function(res) {
      if(res == 'si'){
        console.log($scope.materia.id)
        Materias.remove($scope.materia.id);
        $state.go('app.guarda');
      }
    });
  };

});
