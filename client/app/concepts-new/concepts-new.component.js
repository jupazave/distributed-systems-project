'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './concepts-new.routes';

export class ConceptsNewComponent {

  errors = {};
  submitted = false;

  /*@ngInject*/
  constructor(Topic, Concept, $state, $stateParams) {
    this.Topic = Topic;
    this.Concept = Concept;
    this.$state = $state;
    this.$stateParams = $stateParams;
  }

  $onInit(){
    this.topic = this.Topic.get({ id: this.$stateParams.topic_id });
    this.concept = new this.Concept();
  }

  save(form) {
    this.concept.topic_id = this.topic.id;
    this.submitted = true;
    if(!form.$valid) return;
    this.concept.$save(() => {
      this.$state.go('topics-view', {id : this.topic.id});
    }, {topic_id : this.topic.id}).catch((err) => {
      angular.forEach(err.data.errors, (value, key) => {
        form[value.path].$setValidity('mongoose', false);
        this.errors[value.path] = value.message;
      }, this);
    });
  };
}

export default angular.module('distributedApp.concepts-new', [uiRouter])
  .config(routes)
  .component('conceptsNew', {
    template: require('./concepts-new.html'),
    controller: ConceptsNewComponent,
    controllerAs: 'ctrl'
  })
  .name;
