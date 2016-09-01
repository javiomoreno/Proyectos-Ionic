/**
 * Created by Javier Moreno on 11 ago 2016.
 */
angular.module('starter.services', [])

  .factory('empleados', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var empleados = [{
      id: 0,
      nombre: 'José Manuel Villar',
      descripcion: 'CEO, VillarTechnologies.',
      imagen: 'http://www.villartechnologies.com.ve/wp-content/uploads/2016/07/jose-manuel-cuadrado-1-300x300.png'
    }, {
      id: 1,
      nombre: 'Juan Carlos Maldonado',
      descripcion: 'LIDER DE PROYECTO EN .Net Y JAVA.',
      imagen: 'http://www.villartechnologies.com.ve/es/wp-content/uploads/2016/07/juan-carlos-cuadrardo.png'
    }, {
      id: 2,
      nombre: 'Andrea Hage',
      descripcion: 'DIRECTORA DE VENTAS.',
      imagen: 'http://www.villartechnologies.com.ve/es/wp-content/uploads/2016/07/andrea-hage-cuadrado.png'
    }, {
      id: 3,
      nombre: 'Thomas Ramirez',
      descripcion: 'DIRECTOR DE VENTAS.',
      imagen: 'http://www.villartechnologies.com.ve/es/wp-content/uploads/2016/08/tomas-cuadrado-2.jpg'
    }, {
      id: 4,
      nombre: 'Diego Guerrero',
      descripcion: 'DESARROLLA EN Java y NodeJS.',
      imagen: 'http://www.villartechnologies.com.ve/wp-content/uploads/2016/07/Diego-Guerrero-cuadrado-300x300.png'
    }, {
      id: 5,
      nombre: 'Roberth Ortiz',
      descripcion: 'DESARROLLA EN .Net.',
      imagen: 'http://www.villartechnologies.com.ve/es/wp-content/uploads/2016/07/ROBERT-ORTIZ-cuadraro.png'
    }, {
      id: 6,
      nombre: 'José Zapata',
      descripcion: 'DESARROLLO Y FRONT-END.',
      imagen: 'http://www.villartechnologies.com.ve/es/wp-content/uploads/2016/07/jose-zapata-cuadrado.png'
    }, {
      id: 7,
      nombre: 'Javier Moreno',
      descripcion: 'DESARROLLA EN PHP Y ANGULARJS.',
      imagen: 'http://www.villartechnologies.com.ve/wp-content/uploads/2016/08/javier-cuadrado.jpg'
    }];

    return {
      all: function() {
        return empleados;
      },
      get: function(empleadoId) {
        for (var i = 0; i < empleados.length; i++) {
          if (empleados[i].id === parseInt(empleadoId)) {
            return empleados[i];
          }
        }
        return null;
      }
    };
  })

  .factory('quehacemos', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var trabajos = [{
      id: 0,
      nombre: 'DESARROLLO DE',
      descripcion: 'Paginas web personalizadas, Portales, Comercio electrónico, Apis y Pruebas intensas de Software',
      imagen: 'img/ic_near_me_black_24dp_2x.png'
    }, {
      id: 1,
      nombre: 'FRAMEWORKS',
      descripcion: 'Manejo de tecnología como Bootstrap, PhoneGap, Angular, Laravel, Spring, CodeIgniter, Symfony, Wordpress, NodeJS and Selenium Webdriver.',
      imagen: 'img/ic_settings_black_24dp_2x.png'
    }, {
      id: 2,
      nombre: 'LENGUAJES',
      descripcion: 'HTML 5, Javascript, CSS 3, PHP 5, Java, JSON, C#, Ruby, SQL entre otros.',
      imagen: 'img/ic_code_black_24dp_2x.png'
    }, {
      id: 3,
      nombre: 'TÉCNICAS',
      descripcion: 'MVC, Responsive Design, RESTful APIs, Ajax, Hybrid Apps, Load Balancing, Cloud Services.',
      imagen: 'img/ic_content_paste_black_24dp_2x.png'
    },];

    return {
      all: function() {
        return trabajos;
      },
      get: function(trabajoId) {
        for (var i = 0; i < trabajos.length; i++) {
          if (trabajos[i].id === parseInt(trabajoId)) {
            return trabajos[i];
          }
        }
        return null;
      }
    };
  });
