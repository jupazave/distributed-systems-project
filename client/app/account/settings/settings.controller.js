'use strict';

export default class SettingsController {

  user = {
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
  constructor($state, Auth) {
    this.Auth = Auth;
    this.$state = $state;
  }

  $onInit(){
  }

  changePassword(form) {
    this.submitted = true;

    if(form.$valid) {

      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
      .then(() => {
        this.message = 'Contraseña sustituida correctamente.';
      })
      .catch(() => {
        form.password.$setValidity('mongoose', false);
        this.errors.other = 'Contraseña Incorrecta';
        this.message = '';
      });
    }
  }

}
