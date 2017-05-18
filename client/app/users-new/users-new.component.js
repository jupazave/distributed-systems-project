'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './users-new.routes';

export class UsersNewComponent {

  errors = {};
  submitted = false;
  user = {
    name: '',
    email: '',
    password: ''
  };

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  save(form) {
    this.submitted = true;

    if(form.$valid) {
      return this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Account created, redirect to home
          this.$state.go('users');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the sequelize errors
          if(err.name) {
            angular.forEach(err.fields, field => {
              form[field].$setValidity('mongoose', false);
              this.errors[field] = err.message;
            });
          }
        });
    }
  }
}

export default angular.module('distributedApp.users-new', [uiRouter])
  .config(routes)
  .component('usersNew', {
    template: require('./users-new.html'),
    controller: UsersNewComponent,
    controllerAs: 'ctrl'
  })
  .name;
