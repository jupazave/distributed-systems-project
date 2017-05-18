'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './users-edit.routes';

export class UsersEditComponent {

  user_changes = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  errors = {
    other: undefined
  };
  message = '';
  submitted = false;

  /*@ngInject*/
  constructor(User, $state, $stateParams) {
    this.User = User;
    this.$state = $state;
    this.$stateParams = $stateParams;

  }

  $onInit(){
    this.user = this.User.get({ id: this.$stateParams.id });
  }

  save(form) {
    this.submitted = true;
    if(!form.$valid) return;
    this.user.$update( () => {
      this.$state.go('users');
    }).catch((err) => {
      angular.forEach(err.data.errors, (value, key) => {
        form[value.path].$setValidity('mongoose', false);
        this.errors[value.path] = value.message;
      }, this);
    });
  };
}

export default angular.module('distributedApp.users-edit', [uiRouter])
  .config(routes)
  .component('usersEdit', {
    template: require('./users-edit.html'),
    controller: UsersEditComponent,
    controllerAs: 'ctrl'
  })
  .name;
