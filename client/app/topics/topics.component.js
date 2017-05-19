'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './topics.routes';

export class TopicsComponent {
  /*@ngInject*/
  constructor(Topic) {
    this.Topic = Topic;
    this.loaded = false;
  }

  $onInit() {
    this.topics = this.Topic.all();
    this.topics.$promise.then(() => {
      this.loaded = true;
    });
  }

  delete(topic) {
    topic.$remove().then(() => {
      this.topics.splice(this.topics.indexOf(topic), 1);
    });

  }


}

export default angular.module('distributedApp.groups', [uiRouter])
  .config(routes)
  .component('topics', {
    template: require('./topics.html'),
    controller: TopicsComponent,
    controllerAs: 'ctrl'
  })
  .name;
