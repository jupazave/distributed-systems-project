'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
//import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import { providers } from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import mongooseError from '../components/mongoose-error/mongoose-error.directive';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import UsersComponent from './users/users.component';
import UsersNewComponent from './users-new/users-new.component';
import UsersEditComponent from './users-edit/users-edit.component';
import UsersViewComponent from './users-view/users-view.component';


import './app.less';

angular.module('distributedApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap, _Auth, mongooseError,
    account, navbar, footer, main, constants, util,
    UsersComponent, UsersNewComponent, UsersEditComponent, UsersViewComponent,
  ])
  .config(providers)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['distributedApp'], {
      strictDi: true
    });
  });
