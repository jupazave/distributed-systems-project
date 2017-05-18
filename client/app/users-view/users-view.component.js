'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './users-view.routes';

export class UsersViewComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('distributedApp.users-view', [uiRouter])
  .config(routes)
  .component('usersView', {
    template: require('./users-view.html'),
    controller: UsersViewComponent,
    controllerAs: 'ctrl'
  })
  .name;
