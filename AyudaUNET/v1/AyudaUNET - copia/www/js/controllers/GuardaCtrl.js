/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app.controller('GuardaCtrl', function($scope, $state, $cordovaSQLite, $ionicPopover, $rootScope, $ionicHistory, $ionicPopup, $ionicLoading) {

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

    $scope.data = {};

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.semestre" required>',
      title: 'Nombre de Semestre Nuevo',
      subTitle: 'Formato xxxx-x',
      scope: $scope,
      buttons: [
        {text: 'Cancelar'},
        {
          text: '<b>Guardar</b>',
          type: 'button-positive',
          onTap: function (e) {
            if (!$scope.data.semestre) {
              console.log("vacio ",new Date());
              e.preventDefault();
            } else {
              var query = "INSERT INTO semestres (nombre, fechaRegistro) VALUES (?,?)";
              $cordovaSQLite.execute(db, query, [$scope.data.semestre, new Date()]).then(function(res) {
                console.log("INSERT ID -> " + res.insertId);
                $ionicLoading.show({ template: 'Guardo', noBackdrop: true, duration: 3000 });
              }, function (err) {
                $ionicLoading.show({ template: err, noBackdrop: true, duration: 5000 });
                console.error(err);
              });
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

    var query = "SELECT * FROM semestres order by id desc";
    $cordovaSQLite.execute(db, query).then(function (res) {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          $scope.template += '<ion-radio ng-model="data.select" ng-value="'+res.rows.item(i).id+'">'+res.rows.item(i).nombre+'</ion-radio>'
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
    if ($rootScope.semestre == undefined) {
      var query = "SELECT * FROM semestres order by id desc";
      $cordovaSQLite.execute(db, query).then(function (res) {
        if (res.rows.length > 0) {

          $rootScope.semestre = {};
          $rootScope.semestre.id = res.rows.item(0).id;
          $rootScope.semestre.nombre = res.rows.item(0).nombre;

          $scope.materias = {};
          $scope.materias.vector = [];

          var query = "SELECT * FROM materias WHERE semestre_id = "+$rootScope.semestre.id;
          $cordovaSQLite.execute(db, query).then(function (res) {
            if (res.rows.length > 0){
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

              for(var i = 0; i < res.rows.length; i ++){
                var totalUno, totalDos, totalTres, totalCuatro;
                var notaUno, notaDos, notaTres, notaCuatro;
                if(res.rows.item(i).notaUno == "" || angular.isUndefined(res.rows.item(i).notaUno) || res.rows.item(i).notaUno == null){totalUno = 0; notaUno = 0;}
                else{totalUno = _tabla[res.rows.item(i).notaUno] * (parseFloat(res.rows.item(i).porceUno) / 100); notaUno = res.rows.item(i).notaUno}

                if(res.rows.item(i).notaDos == "" || angular.isUndefined(res.rows.item(i).notaDos) || res.rows.item(i).notaDos == null){totalDos = 0; notaDos = 0;}
                else{totalDos = _tabla[res.rows.item(i).notaDos] * (parseFloat(res.rows.item(i).porceDos) / 100); notaDos = res.rows.item(i).notaDos;}

                if(res.rows.item(i).notaTres == "" || angular.isUndefined(res.rows.item(i).notaTres) || res.rows.item(0).notaTres == null){totalTres = 0; notaTres = 0;}
                else{totalTres = _tabla[res.rows.item(i).notaTres] * (parseFloat(res.rows.item(i).porceTres) / 100); notaTres = res.rows.item(i).notaTres;}

                if(res.rows.item(i).notaCuatro == "" || angular.isUndefined(res.rows.item(i).notaCuatro) || res.rows.item(i).notaCuatro == null){totalCuatro = 0; notaCuatro = 0;}
                else{totalCuatro = _tabla[res.rows.item(i).notaCuatro] * (parseFloat(res.rows.item(i).porceCuatro) / 100); notaCuatro = res.rows.item(i).notaCuatro;}

                var acumulado = parseFloat(totalUno) + parseFloat(totalDos) + parseFloat(totalTres) + parseFloat(totalCuatro);
                $scope.materias.vector.push({
                  id: res.rows.item(i).id,
                  nombre: res.rows.item(i).nombre,
                  acumulado: parseFloat(acumulado).toFixed(2)
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

      var query = "SELECT * FROM semestres WHERE id = "+$rootScope.semestre.id;
      $cordovaSQLite.execute(db, query).then(function (res) {
        if (res.rows.length > 0) {

          $rootScope.semestre = {};
          $rootScope.semestre.id = res.rows.item(0).id;
          $rootScope.semestre.nombre = res.rows.item(0).nombre;

          $scope.materias = {};
          $scope.materias.vector = [];

          var query = "SELECT * FROM materias WHERE semestre_id = " + $rootScope.semestre.id;
          $cordovaSQLite.execute(db, query).then(function (res) {
            if (res.rows.length > 0) {
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

              for (var i = 0; i < res.rows.length; i++) {
                var totalUno, totalDos, totalTres, totalCuatro;
                var notaUno, notaDos, notaTres, notaCuatro;
                if (res.rows.item(i).notaUno == "" || angular.isUndefined(res.rows.item(i).notaUno) || res.rows.item(i).notaUno == null) {
                  totalUno = 0;
                  notaUno = 0;
                }
                else {
                  totalUno = _tabla[res.rows.item(i).notaUno] * (parseFloat(res.rows.item(i).porceUno) / 100);
                  notaUno = res.rows.item(i).notaUno
                }

                if (res.rows.item(i).notaDos == "" || angular.isUndefined(res.rows.item(i).notaDos) || res.rows.item(i).notaDos == null) {
                  totalDos = 0;
                  notaDos = 0;
                }
                else {
                  totalDos = _tabla[res.rows.item(i).notaDos] * (parseFloat(res.rows.item(i).porceDos) / 100);
                  notaDos = res.rows.item(i).notaDos;
                }

                if (res.rows.item(i).notaTres == "" || angular.isUndefined(res.rows.item(i).notaTres) || res.rows.item(0).notaTres == null) {
                  totalTres = 0;
                  notaTres = 0;
                }
                else {
                  totalTres = _tabla[res.rows.item(i).notaTres] * (parseFloat(res.rows.item(i).porceTres) / 100);
                  notaTres = res.rows.item(i).notaTres;
                }

                if (res.rows.item(i).notaCuatro == "" || angular.isUndefined(res.rows.item(i).notaCuatro) || res.rows.item(i).notaCuatro == null) {
                  totalCuatro = 0;
                  notaCuatro = 0;
                }
                else {
                  totalCuatro = _tabla[res.rows.item(i).notaCuatro] * (parseFloat(res.rows.item(i).porceCuatro) / 100);
                  notaCuatro = res.rows.item(i).notaCuatro;
                }

                var acumulado = parseFloat(totalUno) + parseFloat(totalDos) + parseFloat(totalTres) + parseFloat(totalCuatro);
                $scope.materias.vector.push({
                  id: res.rows.item(i).id,
                  nombre: res.rows.item(i).nombre,
                  acumulado: parseFloat(acumulado).toFixed(2)
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
