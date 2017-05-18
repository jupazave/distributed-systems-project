import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {


  /*@ngInject*/
  constructor(Auth, $state) {
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.goTo = $state.go;
  }

  $onInit(){
    if(this.isLoggedIn() && !this.isAdmin()) this.goTo('groups');
    if(this.isLoggedIn() && this.isAdmin()) this.goTo('devices');
  }

}

export default angular.module('distributedApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'ctrl'
  })
  .name;
