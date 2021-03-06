'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './topics-view.routes';

export class TopicsViewComponent {
  /*@ngInject*/
  constructor(Topic, Concept, $state, $stateParams) {

    this.Topic = Topic;
    this.Concept = Concept;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.loaded = false;

  }

  $onInit() {
    this.topic = this.Topic.get({ id: this.$stateParams.id });
    this.concepts = this.Concept.all({ topic_id: this.$stateParams.id });
    this.concepts.$promise.then(() => {
      this.loaded = true;
    });
  }

  delete(concept) {
    concept.$remove().then(() => {
      this.concepts.splice(this.concepts.indexOf(concept), 1);
    });

  }
}

export default angular.module('distributedApp.topics-view', [uiRouter])
  .config(routes)
  .component('topicsView', {
    template: require('./topics-view.html'),
    controller: TopicsViewComponent,
    controllerAs: 'ctrl'
  })
  .name;
