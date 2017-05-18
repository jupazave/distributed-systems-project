'use strict';

export default class LoginController {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;


  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then((user) => {
          if (user.role === 'admin') {
            return this.$state.go('devices');
          } else {
            return this.$state.go('groups');
          }
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
}
