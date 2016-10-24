app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'templates/contacts.html',
          controller: 'ContactsCtrl'
        }
      }
    })

    .state('app.chats', {
      url: '/chats',
      views: {
        'menuContent': {
          templateUrl: 'templates/chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

    .state('app.chatDetalle', {
      url: '/chatDetalle',
      views: {
        'menuContent': {
          templateUrl: 'templates/chatDetalle.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })

    .state('register', {
      url: '/page7',
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

$urlRouterProvider.otherwise('/login')



});
