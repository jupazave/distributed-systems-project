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

import TopicsComponent from './topics/topics.component';
import TopicsNewComponent from './topics-new/topics-new.component';
import TopicsEditComponent from './topics-edit/topics-edit.component';
import TopicsViewComponent from './topics-view/topics-view.component';
import ConceptsNewComponent from './concepts-new/concepts-new.component';
import ConceptsEditComponent from './concepts-edit/concepts-edit.component';

import JournalComponent from './journals/journals.component';
// services

import TopicService from '../services/topic.service';
import ConceptService from '../services/concept.service';
import JournalService from '../services/journal.service';


import './app.less';

angular.module('distributedApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap, _Auth, mongooseError,
    account, navbar, footer, main, constants, util,
    TopicsComponent, TopicsNewComponent, TopicsEditComponent, TopicsViewComponent,
    ConceptsNewComponent, ConceptsEditComponent, JournalComponent,
    TopicService,
    ConceptService,
    JournalService
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
