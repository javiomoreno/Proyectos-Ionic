/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app.controller('GuardaCtrl', function($scope, $state, $cordovaSQLite, $ionicPopover, $rootScope, $ionicHistory, $ionicPopup, $ionicLoading, Semestres, Materias) {

  // .fromTemplate() method
  var template = '<ion-popover-view>' +
    '   <ion-content class="padding">' +
     '     <div class="list">' +
    '        <a class="item" ng-click="showAlert()">' +
      '         Nuevo Semestre' +
      '      </a>' +
     '       <a class="item" ng-click="showAlertSemestres()">' +
       '         Lista de Semestres' +
      '      </a>' +
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

  $scope.showAlert = function() {

    $scope.semestre = [];

    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<label class="item item-input">'+
                  '<input type="text" placeholder="Nuevo Semestre" ng-model="semestre.nombre">'+
                '</label>',
      title: 'Nombre de Semestre Nuevo',
      subTitle: 'Formato XXXX-X',
      scope: $scope,
      buttons: [
        {text: 'Cancelar'},
        {
          text: '<b>Guardar</b>',
          type: 'button-positive',
          onTap: function (e) {
            if (!$scope.semestre.nombre) {
              console.log("vacio ",new Date());
              e.preventDefault();
            } else {
              $scope.semestre.fechaRegistro = new Date();
              Semestres.add($scope.semestre);
              $rootScope.semestre = undefined;
              $scope.closePopover();
              $state.transitionTo('app.guarda', null, {reload: true, notify:true});
            }
          }
        }
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });

  };

  $scope.showAlertSemestres = function() {

    $scope.data = {};
    $scope.data.select = $rootScope.semestre.id;
    $scope.template = "";

    $scope.semestres = [];
    $scope.semestres = null;

    Semestres.all().then(function(semestres){
      $scope.semestres = semestres;
      if ($scope.semestres.length > 0) {
        for (var i = 0; i < $scope.semestres.length; i++) {
          $scope.template += '<ion-radio ng-model="data.select" ng-value="'+$scope.semestres[i].id+'">'+$scope.semestres[i].nombre+'</ion-radio>'
        }
        $ionicHistory.nextViewOptions({
          disableBack: true
        });

        var promptPopup = $ionicPopup.prompt({
          title: 'Seleccione Semestre',
          template: $scope.template,
          scope: $scope,
          buttons: [
            { text: 'Cancelar'},
            {
              text: '<b>Ok</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.data.select) {
                  console.log("Seleccione ");
                  e.preventDefault();
                }
                else {
                  $rootScope.semestre.id = $scope.data.select;
                  $scope.closePopover();
                  $state.transitionTo('app.guarda', null, {reload: true, notify:true});
                }
              }
            }
          ]
        });

        promptPopup.then(function(res) {
          console.log('Tapped!', res);
        });
      }

    });
  };

  $scope.$on('$ionicView.beforeEnter', function(){


    $scope.semestres = [];
    $scope.semestres = null;
    $scope.materiasSelf = [];
    $scope.materiasSelf = null;

    if ($rootScope.semestre == undefined) {
      Semestres.all().then(function(semestres){
        $scope.semestres = semestres;
        if ($scope.semestres.length > 0) {

          $rootScope.semestre = {};
          $rootScope.semestre.id = $scope.semestres[0].id;
          $rootScope.semestre.nombre = $scope.semestres[0].nombre;

          $scope.materias = {};
          $scope.materias.vector = [];

          Materias.all($rootScope.semestre.id).then(function(materias){
            $scope.materiasSelf = materias;
            if ($scope.materiasSelf.length > 0){
              _tabla = new Array(100);
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

              for(var i = 0; i < $scope.materiasSelf.length; i ++){
                var totalUno, totalDos, totalTres, totalCuatro;
                var notaUno, notaDos, notaTres, notaCuatro;
                if($scope.materiasSelf[i].notaUno == "" || angular.isUndefined($scope.materiasSelf[i].notaUno) || $scope.materiasSelf[i].notaUno == null){totalUno = 0; notaUno = 0;}
                else{totalUno = _tabla[$scope.materiasSelf[i].notaUno] * (parseFloat($scope.materiasSelf[i].porceUno) / 100); notaUno = $scope.materiasSelf[i].notaUno}

                if($scope.materiasSelf[i].notaDos == "" || angular.isUndefined($scope.materiasSelf[i].notaDos) || $scope.materiasSelf[i].notaDos == null){totalDos = 0; notaDos = 0;}
                else{totalDos = _tabla[$scope.materiasSelf[i].notaDos] * (parseFloat($scope.materiasSelf[i].porceDos) / 100); notaDos = $scope.materiasSelf[i].notaDos;}

                if($scope.materiasSelf[i].notaTres == "" || angular.isUndefined($scope.materiasSelf[i].notaTres) || $scope.materiasSelf[i].notaTres == null){totalTres = 0; notaTres = 0;}
                else{totalTres = _tabla[$scope.materiasSelf[i].notaTres] * (parseFloat($scope.materiasSelf[i].porceTres) / 100); notaTres = $scope.materiasSelf[i].notaTres;}

                if($scope.materiasSelf[i].notaCuatro == "" || angular.isUndefined($scope.materiasSelf[i].notaCuatro) || $scope.materiasSelf[i].notaCuatro == null){totalCuatro = 0; notaCuatro = 0;}
                else{totalCuatro = _tabla[$scope.materiasSelf[i].notaCuatro] * (parseFloat($scope.materiasSelf[i].porceCuatro) / 100); notaCuatro = $scope.materiasSelf[i].notaCuatro;}

                var acumulado = parseFloat(totalUno) + parseFloat(totalDos) + parseFloat(totalTres) + parseFloat(totalCuatro);
                $scope.materias.vector.push({
                  id: $scope.materiasSelf[i].id,
                  nombre: $scope.materiasSelf[i].nombre,
                  acumulado: parseFloat(acumulado).toFixed(2),
                  nota: Math.round(acumulado)
                });
              }
            }
          });
        }else{
          $rootScope.semestre = {};
          $rootScope.semestre.id = "";
          $rootScope.semestre.nombre = "";
        }
      });
    }

    else{

      Semestres.get($rootScope.semestre.id).then(function(semestre){
        $scope.semestres = semestre;
        console.log("semestre: "+$scope.semestres.id);
        if ($scope.semestres != undefined) {

          $rootScope.semestre = {};
          $rootScope.semestre.id = $scope.semestres.id;
          $rootScope.semestre.nombre = $scope.semestres.nombre;

          $scope.materias = {};
          $scope.materias.vector = [];

          Materias.all($rootScope.semestre.id).then(function(materias){
            $scope.materiasSelf = materias;
            if ($scope.materiasSelf.length > 0) {
              _tabla = new Array(100);
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

              for (var i = 0; i < $scope.materiasSelf.length; i++) {
                var totalUno, totalDos, totalTres, totalCuatro;
                var notaUno, notaDos, notaTres, notaCuatro;
                if ($scope.materiasSelf[i].notaUno == "" || angular.isUndefined($scope.materiasSelf[i].notaUno) || $scope.materiasSelf[i].notaUno == null) {
                  totalUno = 0;
                  notaUno = 0;
                }
                else {
                  totalUno = _tabla[$scope.materiasSelf[i].notaUno] * (parseFloat($scope.materiasSelf[i].porceUno) / 100);
                  notaUno = $scope.materiasSelf[i].notaUno
                }

                if ($scope.materiasSelf[i].notaDos == "" || angular.isUndefined($scope.materiasSelf[i].notaDos) || $scope.materiasSelf[i].notaDos == null) {
                  totalDos = 0;
                  notaDos = 0;
                }
                else {
                  totalDos = _tabla[$scope.materiasSelf[i].notaDos] * (parseFloat($scope.materiasSelf[i].porceDos) / 100);
                  notaDos = $scope.materiasSelf[i].notaDos;
                }

                if ($scope.materiasSelf[i].notaTres == "" || angular.isUndefined($scope.materiasSelf[i].notaTres) || $scope.materiasSelf[i].notaTres == null) {
                  totalTres = 0;
                  notaTres = 0;
                }
                else {
                  totalTres = _tabla[$scope.materiasSelf[i].notaTres] * (parseFloat($scope.materiasSelf[i].porceTres) / 100);
                  notaTres = $scope.materiasSelf[i].notaTres;
                }

                if ($scope.materiasSelf[i].notaCuatro == "" || angular.isUndefined($scope.materiasSelf[i].notaCuatro) || $scope.materiasSelf[i].notaCuatro == null) {
                  totalCuatro = 0;
                  notaCuatro = 0;
                }
                else {
                  totalCuatro = _tabla[$scope.materiasSelf[i].notaCuatro] * (parseFloat($scope.materiasSelf[i].porceCuatro) / 100);
                  notaCuatro = $scope.materiasSelf[i].notaCuatro;
                }

                var acumulado = parseFloat(totalUno) + parseFloat(totalDos) + parseFloat(totalTres) + parseFloat(totalCuatro);
                $scope.materias.vector.push({
                  id: $scope.materiasSelf[i].id,
                  nombre: $scope.materiasSelf[i].nombre,
                  acumulado: parseFloat(acumulado).toFixed(2),
                  nota: Math.round(acumulado)
                });
              }
            }
          });
        }
      });
    }

  });

  $scope.onNuevaMateria = function (res) {
    $state.go('app.nuevamateria');
  }

});
