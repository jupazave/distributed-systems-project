'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './users.routes';

export class UsersComponent {
  /*@ngInject*/
  constructor(User, Notification, SweetAlert) {
    this.User = User;
    this.Notification = Notification;
    this.SweetAlert = SweetAlert;
  }

  $onInit() {
    this.users = this.User.all();
  }

  toggle(user){

    user.$toggle().then((res) => {
      this.Notification.success('Usuario modificado correctamente.');
    }).catch(err => {
      if(err.status === 504){
        this.Notification.error('No pudimos ejecutar alguna acción, porfavor intentalo manualmente.');
      } else{
        this.Notification.error('Hubo un problema.');
      }
    });

  }

  delete(user) {

    this.SweetAlert.swal({
      title: "¿Estas seguro?",
      text: "No podras deshacer esta acción.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Borrar",
      closeOnConfirm: false,
      showLoaderOnConfirm: true
    },() => {
      user.$remove().then(() => {
        this.users = this.User.all();
        this.SweetAlert.swal("¡Borrado!", "Usuario eliminado", "success");
      });
    });

  }
}

export default angular.module('distributedApp.users', [uiRouter])
  .config(routes)
  .component('users', {
    template: require('./users.html'),
    controller: UsersComponent,
    controllerAs: 'ctrl'
  })
  .name;
