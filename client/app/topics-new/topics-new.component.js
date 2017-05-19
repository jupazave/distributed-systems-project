'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './topics-new.routes';

export class TopicsNewComponent {

  errors = {};
  submitted = false;

  /*@ngInject*/
  constructor(Topic, $state) {
    this.Topic = Topic;
    this.$state = $state;
  }

  $onInit(){
    this.topic = new this.Topic();
  }

  save(form) {
    this.submitted = true;
    if(!form.$valid) return;
    this.topic.$save(() => {
      this.$state.go('topics');
    }).catch((err) => {
      angular.forEach(err.data.errors, (value, key) => {
        form[value.path].$setValidity('mongoose', false);
        this.errors[value.path] = value.message;
      }, this);
    });
  };
}

export default angular.module('distributedApp.topics-new', [uiRouter])
  .config(routes)
  .component('topicsNew', {
    template: require('./topics-new.html'),
    controller: TopicsNewComponent,
    controllerAs: 'ctrl'
  })
  .name;
