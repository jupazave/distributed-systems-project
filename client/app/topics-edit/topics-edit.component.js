'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './topics-edit.routes';

export class TopicsEditComponent {
  /*@ngInject*/
  constructor(Topic, $state, $stateParams) {
    this.Topic = Topic;
    this.$state = $state;
    this.$stateParams = $stateParams;

  }

  $onInit(){
    this.topic = this.Topic.get({ id: this.$stateParams.id });
  }

  update() {
    this.topic.$update(() =>  {
      this.$state.go('topics');
    });
  };
}

export default angular.module('distributedApp.topics-edit', [uiRouter])
  .config(routes)
  .component('topicsEdit', {
    template: require('./topics-edit.html'),
    controller: TopicsEditComponent,
    controllerAs: 'ctrl'
  })
  .name;
