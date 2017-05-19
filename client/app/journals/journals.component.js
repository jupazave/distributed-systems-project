'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './journals.routes';

export class JournalsComponent {
  /*@ngInject*/
  constructor(Journal) {
    this.Journal = Journal;
    this.loaded = false;
  }

  $onInit() {
    this.journals = this.Journal.all();
    this.journals.$promise.then(() => {
      this.loaded = true;
    });
  }

  parse(j){
    let str = "";

    if(j.action == 'new') str += 'Se ha añadido ';
    if(j.action == 'edit') str += 'Se ha eliminado ';
    if(j.action == 'delete') str += 'Se ha borrado ';

    if(j.type == 'concept') str += 'el concepto ';
    if(j.type == 'topic') str += 'el tema ';

    str += j.name;

    str += ' por el usuario ';
    str += `${j.User.name}(${j.User.email})`;

    str += ` en la fecha ${j.modified_at}`;

    return str;

  }



}

export default angular.module('distributedApp.journals', [uiRouter])
  .config(routes)
  .component('journals', {
    template: require('./journals.html'),
    controller: JournalsComponent,
    controllerAs: 'ctrl'
  })
  .name;
