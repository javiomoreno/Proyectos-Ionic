angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $state, $ionicHistory) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };

    $scope.showAlert = function() {

      $scope.data = {};

      $ionicHistory.nextViewOptions({
        disableBack: true
      });

      var promptPopup = $ionicPopup.prompt({
        title: '¿Cantidad de Parciales?',
        template: '<ion-radio ng-model="data.select" ng-value="2">2 Parciales</ion-radio><ion-radio ng-model="data.select" ng-value="3">3 Parciales</ion-radio><ion-radio ng-model="data.select" ng-value="4">4 Parciales</ion-radio>',
        scope: $scope,
        buttons: [
          { text: 'Cancel',
            onTap: function(e) {
              return "null";
            }
          },
          {
            text: '<b>Ok</b>',
            type: 'button-positive',
            onTap: function(e) {
              return $scope.data.select;
            }
          }
        ]
      });

      promptPopup.then(function(res) {
        if(res == 'null'){
          $state.go('app.inicio');
        }
        else{
          $state.go('app.cuanto', {id: res});
        }
      });
    };
  })

  .controller('InicioCtrl', function($scope) {

  })

  .controller('TablaCtrl', function($scope, $ionicPopup) {

    $scope.DevolverNota = function(numero)
    {
      if(numero > 9.0)
        return -1;
      if(numero == 0)
        return 0;
      this._nota = 0;
      for (var i = 0; i <= 100; i++)
      {
        if(this._tabla[i] == numero)
        {
          this._nota = i;
          break;
        }
      }
      return this._nota;
    }


    $scope.showAlert = function(nota) {

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
        console.log('close');
      });
    };
  })

  .controller('CuantoCtrl', function($scope, $stateParams) {
    $scope.id = $stateParams.id;
    $scope.onCalcular = function (res) {
      console.log("aqui llega");
    }
  })

  .controller('DetalleMateriaCtrl', function($scope, $state, $stateParams, $cordovaSQLite, $ionicPopup, $ionicHistory) {

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

    $scope.materia = {};

    var query = "SELECT * FROM materias WHERE id = ?";
    $cordovaSQLite.execute(db, query, [$stateParams.id]).then(function (res) {
      if (res.rows.length > 0){
        var totalUno, totalDos, totalTres, totalCuatro;
        var notaUno, notaDos, notaTres, notaCuatro;
        if(res.rows.item(0).notaUno == "" || angular.isUndefined(res.rows.item(0).notaUno) || res.rows.item(0).notaUno == null){totalUno = 0; notaUno = 0;}
        else{totalUno = _tabla[res.rows.item(0).notaUno] * (parseFloat(res.rows.item(0).porceUno) / 100); notaUno = res.rows.item(0).notaUno}

        if(res.rows.item(0).notaDos == "" || angular.isUndefined(res.rows.item(0).notaDos) || res.rows.item(0).notaDos == null){totalDos = 0; notaDos = 0;}
        else{totalDos = _tabla[res.rows.item(0).notaDos] * (parseFloat(res.rows.item(0).porceDos) / 100); notaDos = res.rows.item(0).notaDos;}

        if(res.rows.item(0).notaTres == "" || angular.isUndefined(res.rows.item(0).notaTres) || res.rows.item(0).notaTres == null){totalTres = 0; notaTres = 0;}
        else{totalTres = _tabla[res.rows.item(0).notaTres] * (parseFloat(res.rows.item(0).porceTres) / 100); notaTres = res.rows.item(0).notaTres;}

        if(res.rows.item(0).notaCuatro == "" || angular.isUndefined(res.rows.item(0).notaCuatro) || res.rows.item(0).notaCuatro == null){totalCuatro = 0; notaCuatro = 0;}
        else{totalCuatro = _tabla[res.rows.item(0).notaCuatro] * (parseFloat(res.rows.item(0).porceCuatro) / 100); notaCuatro = res.rows.item(0).notaCuatro;}

        var acumulado = parseFloat(totalUno) + parseFloat(totalDos) + parseFloat(totalTres) + parseFloat(totalCuatro);
        $scope.materia = {
          id: res.rows.item(0).id,
          nombre : res.rows.item(0).nombre,
          notaUno: notaUno,
          notaDos : notaDos,
          notaTres : notaTres,
          notaCuatro : notaCuatro,
          porceUno : res.rows.item(0).porceUno,
          porceDos : res.rows.item(0).porceDos,
          porceTres : res.rows.item(0).porceTres,
          porceCuatro : res.rows.item(0).porceCuatro,
          totalUno : totalUno,
          totalDos : totalDos,
          totalTres : totalTres,
          totalCuatro : totalCuatro,
          acumulado : parseFloat(acumulado).toFixed(2),
          notaFinal: Math.round(acumulado),
          cant_parciales : res.rows.item(0).cant_parciales
        }

        console.log($scope.materia);
      }
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

  })

  .controller('GuardaCtrl', function($scope, $state, $cordovaSQLite) {

    $scope.materias = {};
    $scope.materias.vector = [];

    var query = "SELECT * FROM materias";
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
          console.log($scope.materias.vector[i]);
        }
      }
    });

    $scope.onNuevaMateria = function (res) {
      $state.go('app.nuevamateria');
    }

  })

  .controller('NuevaMateriaCtrl', function($scope, $state, $cordovaSQLite) {

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

    //$cordovaSQLite.execute(db, "drop table materias");

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
          var query = "INSERT INTO materias (nombre, cant_parciales, porceUno, porceDos, porceTres, porceCuatro, notaUno, notaDos, notaTres, notaCuatro) VALUES (?,?,?,?,?,?,?,?,?,?)";
          $cordovaSQLite.execute(db, query, [$scope.nueva.nombre, $scope.nueva.cantParciales.value, $scope.nueva.porceUno, $scope.nueva.porceDos, $scope.nueva.porceTres, $scope.nueva.porceCuatro, $scope.nueva.notaUno, $scope.nueva.notaDos, $scope.nueva.notaTres, $scope.nueva.notaCuatro]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
          }, function (err) {
            console.error(err);
          });
          $state.go('app.guarda');
        }
      }
      else if($scope.nueva.cantParciales.value == 2){
        console.log("notaUno: "+$scope.nueva.notaUno)
        console.log("notaDos: "+$scope.nueva.notaDos)
        console.log("porceUno: "+$scope.nueva.porceUno)
        console.log("porceDos: "+$scope.nueva.porceDos)
        console.log("suma: "+(parseInt($scope.nueva.porceUno) + parseInt($scope.nueva.porceDos)))

        if(($scope.nueva.notaUno > 100 || $scope.nueva.notaUno < 0 || $scope.nueva.notaDos > 100 || $scope.nueva.notaDos < 0)
          || ($scope.nueva.porceUno > 100 || $scope.nueva.porceUno < 0 || $scope.nueva.porceDos > 100 || $scope.nueva.porceDos < 0)
          || ((parseInt($scope.nueva.porceUno) + parseInt($scope.nueva.porceDos)) > 100)
          || (angular.isUndefined($scope.nueva.porceUno) || angular.isUndefined($scope.nueva.porceDos))
          || ($scope.nueva.porceUno == null || $scope.nueva.porceDos == null)
          || ($scope.nueva.porceUno == '' || $scope.nueva.porceDos == '')){
          console.log("Error.!!");
        }
        else{
          var query = "INSERT INTO materias (nombre, cant_parciales, porceUno, porceDos, porceTres, porceCuatro, notaUno, notaDos, notaTres, notaCuatro) VALUES (?,?,?,?,?,?,?,?,?,?)";
          $cordovaSQLite.execute(db, query, [$scope.nueva.nombre, $scope.nueva.cantParciales.value, $scope.nueva.porceUno, $scope.nueva.porceDos, $scope.nueva.porceTres, $scope.nueva.porceCuatro, $scope.nueva.notaUno, $scope.nueva.notaDos, $scope.nueva.notaTres, $scope.nueva.notaCuatro]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
          }, function (err) {
            console.error(err);
          });
          $state.go('app.guarda');
        }
      }
      if($scope.nueva.cantParciales.value == 3){
        if(($scope.nueva.notaUno > 100 || $scope.nueva.notaUno < 0 || $scope.nueva.notaDos > 100 || $scope.nueva.notaDos < 0 || $scope.nueva.notaTres > 100 || $scope.nueva.notaTres < 0)
          || ($scope.nueva.porceUno > 100 || $scope.nueva.porceUno < 0 || $scope.nueva.porceDos > 100 || $scope.nueva.porceDos < 0 || $scope.nueva.porceTres > 100 || $scope.nueva.porceTres < 0)
          || ((parseInt($scope.nueva.porceUno) + parseInt($scope.nueva.porceDos) + parseInt($scope.nueva.porceTres)) > 100)
          || (angular.isUndefined($scope.nueva.porceUno) || angular.isUndefined($scope.nueva.porceDos) || angular.isUndefined($scope.nueva.porceTres))
          || ($scope.nueva.porceUno == null || $scope.nueva.porceDos == null || $scope.nueva.porceTres == null)
          || ($scope.nueva.porceUno == '' || $scope.nueva.porceDos == '' || $scope.nueva.porceTres == '')){
          console.log("Error.!!");
        }
        else{
          var query = "INSERT INTO materias (nombre, cant_parciales, porceUno, porceDos, porceTres, porceCuatro, notaUno, notaDos, notaTres, notaCuatro) VALUES (?,?,?,?,?,?,?,?,?,?)";
          $cordovaSQLite.execute(db, query, [$scope.nueva.nombre, $scope.nueva.cantParciales.value, $scope.nueva.porceUno, $scope.nueva.porceDos, $scope.nueva.porceTres, $scope.nueva.porceCuatro, $scope.nueva.notaUno, $scope.nueva.notaDos, $scope.nueva.notaTres, $scope.nueva.notaCuatro]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
          }, function (err) {
            console.error(err);
          });
          $state.go('app.guarda');
        }
      }
      if($scope.nueva.cantParciales.value == 4){
        if(($scope.nueva.notaUno > 100 || $scope.nueva.notaUno < 0 || $scope.nueva.notaDos > 100 || $scope.nueva.notaDos < 0 || $scope.nueva.notaTres > 100 || $scope.nueva.notaTres < 0 || $scope.nueva.notaCuatro > 100 || $scope.nueva.notaCuatro < 0)
          || ($scope.nueva.porceUno > 100 || $scope.nueva.porceUno < 0 || $scope.nueva.porceDos > 100 || $scope.nueva.porceDos < 0 || $scope.nueva.porceTres > 100 || $scope.nueva.porceTres < 0 || $scope.nueva.porceCuatro > 100 || $scope.nueva.porceCuatro < 0)
          || ((parseInt($scope.nueva.porceUno) + parseInt($scope.nueva.porceDos) + parseInt($scope.nueva.porceTres) + parseInt($scope.nueva.porceCuatro)) > 100)
          || (angular.isUndefined($scope.nueva.porceUno) || angular.isUndefined($scope.nueva.porceDos) || angular.isUndefined($scope.nueva.porceTres) || angular.isUndefined($scope.nueva.porceCuatro))
          || ($scope.nueva.porceUno == null || $scope.nueva.porceDos == null || $scope.nueva.porceTres == null || $scope.nueva.porceCuatro == null)
          || ($scope.nueva.porceUno == '' || $scope.nueva.porceDos == '' || $scope.nueva.porceTres == '' || $scope.nueva.porceCuatro == '')){
          console.log("Error.!!");
        }
        else{
          var query = "INSERT INTO materias (nombre, cant_parciales, porceUno, porceDos, porceTres, porceCuatro, notaUno, notaDos, notaTres, notaCuatro) VALUES (?,?,?,?,?,?,?,?,?,?)";
          $cordovaSQLite.execute(db, query, [$scope.nueva.nombre, $scope.nueva.cantParciales.value, $scope.nueva.porceUno, $scope.nueva.porceDos, $scope.nueva.porceTres, $scope.nueva.porceCuatro, $scope.nueva.notaUno, $scope.nueva.notaDos, $scope.nueva.notaTres, $scope.nueva.notaCuatro]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
          }, function (err) {
            console.error(err);
          });
          $state.go('app.guarda');
        }
      }
    }

  })
  
  .controller('EditarMateriaCtrl', function($scope, $state, $cordovaSQLite, $stateParams) {

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
