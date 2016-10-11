/**
 * Created by Javier Moreno on 4 oct 2016.
 */
app.controller('CuantoCtrl', function($scope, $state, $stateParams, $ionicLoading, $ionicPopover, $ionicHistory, $ionicPopup) {

  // .fromTemplate() method
  var template = '<ion-popover-view style="height: 135px !important;">' +
    '   <ion-content class="padding">' +
    '     <div class="list">' +
    '        <a class="item" ng-click="showAlert()">' +
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
        { text: 'Cancelar',
          onTap: function(e) {
            return "null";
          }
        },
        {
          text: '<b>Ok</b>',
          type: 'button-positive',
          onTap: function(e) {
            if ($scope.data.select != undefined) {
              return $scope.data.select;
            }
            else{
              return "null";
            }
          }
        }
      ]
    });

    promptPopup.then(function(res) {
      if(res == 'null'){
        $scope.closePopover();
        $state.go('app.inicio');
      }
      else{
        $scope.closePopover();
        $state.go('app.cuanto', {id: res});
      }
    });
  };

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
    var sumatoria;
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
            sumatoria = CalcularNota1($scope.materia.porceUno, parseInt($scope.materia.notaUno));
            CalcularCuantoFalta(sumatoria, parseInt($scope.materia.porceUno));
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
              sumatoria = CalcularNota2($scope.materia.porceUno, $scope.materia.porceDos, parseInt($scope.materia.notaUno), parseInt($scope.materia.notaDos));
              CalcularCuantoFalta(sumatoria, (parseInt($scope.materia.porceUno) + parseInt($scope.materia.porceDos)));
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
              sumatoria = CalcularNota3($scope.materia.porceUno, $scope.materia.porceDos, $scope.materia.porceTres, parseInt($scope.materia.notaUno), parseInt($scope.materia.notaDos), parseInt($scope.materia.notaTres));
              CalcularCuantoFalta(sumatoria, (parseInt($scope.materia.porceUno) + parseInt($scope.materia.porceDos) + parseInt($scope.materia.porceTres)));
            }
          }
        }
      }
    }
  }

  DevolverNota = function(numero){
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

  CalcularCuantoFalta = function (sumatoria, porce) {
    var aux1, aux2;
    var template = "", template1 = "";
    var porceDos = (100 - porce) / 100;
    if(sumatoria < 4.5){
      template += "Lleva acumulado: "+sumatoria+"<br>";
      if(DevolverNota(parseFloat((4.5 - sumatoria)/porceDos).toFixed(1)) == -1){
        template1 = "Esta fuera de escala \n";
      }else{
        template1 = "Aún la puede pasar"
        if(DevolverNota(parseFloat((4.5 - sumatoria)/porceDos).toFixed(1)) == 0) {
          template += "Para el 5 menos de 7 pts <br>";
        }
        else{
          template += "Para el 5: "+DevolverNota(parseFloat((4.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
        }
        if(DejarlaMasAlta(5.5, sumatoria, porceDos)){
          template += "Para el 6: "+DevolverNota(parseFloat((5.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
        }
        if(DejarlaMasAlta(6.5, sumatoria, porceDos)){
          template += "Para el 7: "+DevolverNota(parseFloat((6.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
        }
        if(DejarlaMasAlta(7.5, sumatoria, porceDos)){
          template += "Para el 8: "+DevolverNota(parseFloat((7.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
        }
        if(DejarlaMasAlta(8.5, sumatoria, porceDos)){
          template += "Para el 9: "+DevolverNota(parseFloat((8.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
        }
      }
      var alertPopup = $ionicPopup.alert({
        title: '¿Cuánto me Falta?',
        subTitle: template1,
        template: template,
      });
    }

    if(sumatoria >= 4.5 && sumatoria < 5.5){
      template = "Lleva acumulado: "+sumatoria+"<br>";
      template1 = "Ya la pasó";
      if(DevolverNota(parseFloat((5.5 - sumatoria)/porceDos).toFixed(1)) == 0) {
        template += "Para el 6 menos de 7 pts.<br>";
      }
      else{
        template += "Para el 6: "+DevolverNota(parseFloat((5.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
      }
      if(DejarlaMasAlta(6.5, sumatoria, porceDos)){
        template += "Para el 7: "+DevolverNota(parseFloat((6.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
      }
      if(DejarlaMasAlta(7.5, sumatoria, porceDos)){
        template += "Para el 8: "+DevolverNota(parseFloat((7.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
      }
      if(DejarlaMasAlta(8.5, sumatoria, porceDos)){
        template += "Para el 9: "+DevolverNota(parseFloat((8.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
      }
      var alertPopup = $ionicPopup.alert({
        title: '¿Cuánto me Falta?',
        subTitle: template1,
        template: template,
      });
    }

    if(sumatoria >= 5.5 && sumatoria < 6.5){
      template = "Lleva acumulado: "+sumatoria+"<br>";
      template1 = "Ya la pasó";
      if(DevolverNota(parseFloat((6.5 - sumatoria)/porceDos).toFixed(1)) == 0) {
        template += "Para el 7 menos de 7 pts.<br>";
      }
      else{
        template += "para 7: "+DevolverNota(parseFloat((6.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
      }
      if(DejarlaMasAlta(7.5, sumatoria, porceDos)){
        template += "Para el 8: "+DevolverNota(parseFloat((7.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
      }
      if(DejarlaMasAlta(8.5, sumatoria, porceDos)){
        template += "Para el 9: "+DevolverNota(parseFloat((8.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
      }
      var alertPopup = $ionicPopup.alert({
        title: '¿Cuánto me Falta?',
        subTitle: template1,
        template: template,
      });
    }

    if(sumatoria >= 6.5 && sumatoria < 7.5){
      template = "Lleva acumulado: "+sumatoria+"<br>";
      template1 = "Ya la pasó";
      if(DevolverNota(parseFloat((7.5 - sumatoria)/porceDos).toFixed(1)) == 0) {
        template += "Para el 8 menos de 7 pts.<br>";
      }
      else{
        template += "para 8: "+DevolverNota(parseFloat((7.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
      }
      if(DejarlaMasAlta(8.5, sumatoria, porceDos)){
        template += "Para el 9: "+DevolverNota(parseFloat((8.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
      }
      var alertPopup = $ionicPopup.alert({
        title: '¿Cuánto me Falta?',
        subTitle: template1,
        template: template,
      });
    }

    if(sumatoria >= 7.5 && sumatoria < 8.5){
      template = "Lleva acumulado: "+sumatoria+"<br>";
      template1 = "Ya la pasó";
      if(DevolverNota(parseFloat((8.5 - sumatoria)/porceDos).toFixed(1)) == 0) {
        template += "Para el 9 menos de 7 pts.<br>";
      }
      else{
        template += "para 9: "+DevolverNota(parseFloat((8.5 - sumatoria)/porceDos).toFixed(1))+" pts.<br>";
      }
      var alertPopup = $ionicPopup.alert({
        title: '¿Cuánto me Falta?',
        subTitle: template1,
        template: template,
      });
    }

    if(sumatoria >= 8.5){
      var alertPopup = $ionicPopup.alert({
        title: '¿Cuánto me Falta?',
        subTitle: "Ya la pasó",
        template: "Lleva acumulado: "+sumatoria+"<br> Ya la tiene con 9",
      });
    }
  }

  DejarlaMasAlta = function(superior, sumatoria, porcen){
    if(DevolverNota(parseFloat((superior - sumatoria)/porcen).toFixed(1)) != -1 )
    return true;
  else
    return false;
  }

  CalcularNota1 = function(porceUno, notaUno)
  {
    var porce_1, sumatoria;
    porce_1 = porceUno / 100;

    sumatoria = (porce_1 * $scope.vector._tabla[notaUno]);
    return parseFloat((sumatoria*100)/100).toFixed(2);
  }

  CalcularNota2 = function(porceUno, porceDos, notaUno, notaDos)
  {
    var porce_1, porce_2, sumatoria;
    porce_1 = porceUno / 100;
    porce_2 = porceDos / 100;

    sumatoria = (porce_1 * $scope.vector._tabla[notaUno]) + (porce_2 * $scope.vector._tabla[notaDos]);
    return parseFloat((sumatoria*100)/100).toFixed(2);
  }

  CalcularNota3 = function(porceUno, porceDos, porceTres, notaUno, notaDos, notaTres)
  {
    var porce_1, porce_2, porce_3, sumatoria;
    porce_1 = porceUno / 100;
    porce_2 = porceDos / 100;
    porce_3 = porceTres / 100;

    sumatoria = (porce_1 * $scope.vector._tabla[notaUno]) + (porce_2 * $scope.vector._tabla[notaDos]) + (porce_3 * $scope.vector._tabla[notaTres]);
    return parseFloat((sumatoria*100)/100).toFixed(2);
  }


  $scope.DevolverPosicion = function(numero){
    return $scope.vector._tabla[numero];
  }
});
