/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app.controller('DetalleMateriaCtrl', function($scope, $state, $stateParams, $cordovaSQLite, $ionicPopup, $ionicHistory) {

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

    var query = "SELECT * FROM materias WHERE id = ?";
    $cordovaSQLite.execute(db, query, [$stateParams.id]).then(function (res) {
      if (res.rows.length > 0) {
        var totalUno, totalDos, totalTres, totalCuatro;
        var notaUno, notaDos, notaTres, notaCuatro;
        if (res.rows.item(0).notaUno == "" || angular.isUndefined(res.rows.item(0).notaUno) || res.rows.item(0).notaUno == null) {
          totalUno = 0;
          notaUno = 0;
        }
        else {
          totalUno = _tabla[res.rows.item(0).notaUno] * (parseFloat(res.rows.item(0).porceUno) / 100);
          notaUno = res.rows.item(0).notaUno
        }

        if (res.rows.item(0).notaDos == "" || angular.isUndefined(res.rows.item(0).notaDos) || res.rows.item(0).notaDos == null) {
          totalDos = 0;
          notaDos = 0;
        }
        else {
          totalDos = _tabla[res.rows.item(0).notaDos] * (parseFloat(res.rows.item(0).porceDos) / 100);
          notaDos = res.rows.item(0).notaDos;
        }

        if (res.rows.item(0).notaTres == "" || angular.isUndefined(res.rows.item(0).notaTres) || res.rows.item(0).notaTres == null) {
          totalTres = 0;
          notaTres = 0;
        }
        else {
          totalTres = _tabla[res.rows.item(0).notaTres] * (parseFloat(res.rows.item(0).porceTres) / 100);
          notaTres = res.rows.item(0).notaTres;
        }

        if (res.rows.item(0).notaCuatro == "" || angular.isUndefined(res.rows.item(0).notaCuatro) || res.rows.item(0).notaCuatro == null) {
          totalCuatro = 0;
          notaCuatro = 0;
        }
        else {
          totalCuatro = _tabla[res.rows.item(0).notaCuatro] * (parseFloat(res.rows.item(0).porceCuatro) / 100);
          notaCuatro = res.rows.item(0).notaCuatro;
        }

        var acumulado = parseFloat(totalUno) + parseFloat(totalDos) + parseFloat(totalTres) + parseFloat(totalCuatro);
        $scope.materia = {
          id: res.rows.item(0).id,
          nombre: res.rows.item(0).nombre,
          notaUno: notaUno,
          notaDos: notaDos,
          notaTres: notaTres,
          notaCuatro: notaCuatro,
          porceUno: res.rows.item(0).porceUno,
          porceDos: res.rows.item(0).porceDos,
          porceTres: res.rows.item(0).porceTres,
          porceCuatro: res.rows.item(0).porceCuatro,
          totalUno: parseFloat(totalUno).toFixed(2),
          totalDos: parseFloat(totalDos).toFixed(2),
          totalTres: parseFloat(totalTres).toFixed(2),
          totalCuatro: parseFloat(totalCuatro).toFixed(2),
          acumulado: parseFloat(acumulado).toFixed(2),
          notaFinal: Math.round(acumulado),
          cant_parciales: res.rows.item(0).cant_parciales
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
        var query = "DELETE FROM materias WHERE id = ?";
        $cordovaSQLite.execute(db, query, [$scope.materia.id]).then(function (res) {
          console.log(res);
        })
        $state.go('app.guarda');
      }
    });
  };

});
