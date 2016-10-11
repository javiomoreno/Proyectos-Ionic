/**
 * Created by Javier Moreno on 11 ago 2016.
 */
app.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
    var self = this;


    self.query = function (query, parameters) {
      parameters = parameters || [];
      var q = $q.defer();

      $ionicPlatform.ready(function () {
        $cordovaSQLite.execute(db, query, parameters)
          .then(function (result) {
            q.resolve(result);
          }, function (error) {
            console.warn('I found an error');
            console.warn(error);
            q.reject(error);
          });
      });
      return q.promise;
    }

    // Proces a result set
    self.getAll = function(result) {
      var output = [];

      for (var i = 0; i < result.rows.length; i++) {
        output.push(result.rows.item(i));
      }
      return output;
    }

    // Proces a single result
    self.getById = function(result) {
      var output = null;
      output = angular.copy(result.rows.item(0));
      return output;
    }

    return self;
  })

  .factory('Semestres', function($cordovaSQLite, DBA) {
    var self = this;

    self.all = function() {
      return DBA.query("SELECT * FROM semestres order by id desc")
        .then(function(result){
          return DBA.getAll(result);
        });
    }

    self.get = function(semestreId) {
      var parameters = [semestreId];
      return DBA.query("SELECT * FROM semestres WHERE id = (?)", parameters)
        .then(function(result) {
          return DBA.getById(result);
        });
    }

    self.add = function(semestre) {
      var parameters = [semestre.nombre, semestre.fechaRegistro];
      return DBA.query("INSERT INTO semestres (nombre, fechaRegistro) VALUES (?,?)", parameters);
    }

    self.remove = function(member) {
      var parameters = [member.id];
      return DBA.query("DELETE FROM team WHERE id = (?)", parameters);
    }

    self.update = function(origMember, editMember) {
      var parameters = [editMember.id, editMember.name, origMember.id];
      return DBA.query("UPDATE team SET id = (?), name = (?) WHERE id = (?)", parameters);
    }

    return self;
  })

  .factory('Materias', function($cordovaSQLite, DBA) {
    var self = this;

    self.all = function(semestre) {
      var parameters = [semestre];
      return DBA.query("SELECT * FROM materias WHERE semestre_id = (?)", parameters)
        .then(function(result){
          return DBA.getAll(result);
        });
    }

    self.get = function(materiasId) {
      var parameters = [materiasId];
      return DBA.query("SELECT * FROM materias WHERE id = (?)", parameters)
        .then(function(result) {
          return DBA.getById(result);
        });
    }

    self.add = function(materia) {
      var parameters = [materia.nombre, materia.cantParciales.value, materia.porceUno, materia.porceDos, materia.porceTres,  materia.porceCuatro, materia.notaUno, materia.notaDos, materia.notaTres,  materia.notaCuatro, materia.semestre_id];
      return DBA.query("INSERT INTO materias (nombre, cant_parciales, porceUno, porceDos, porceTres, porceCuatro, notaUno, notaDos, notaTres, notaCuatro, semestre_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)", parameters);
    }

    self.remove = function(materiasId) {
      var parameters = [materiasId];
      return DBA.query("DELETE FROM materias WHERE id = (?)", parameters);
    }

    self.update = function(materia) {
      var parameters = [materia.nombre, materia.porceUno, materia.porceDos, materia.porceTres,  materia.porceCuatro, materia.notaUno, materia.notaDos, materia.notaTres,  materia.notaCuatro, materia.id];
      return DBA.query("UPDATE materias SET nombre = (?), porceUno = (?), porceDos = (?), porceTres = (?), porceCuatro = (?), notaUno = (?), notaDos = (?), notaTres = (?), notaCuatro = (?) WHERE id = (?)", parameters);
    }

    return self;
});
