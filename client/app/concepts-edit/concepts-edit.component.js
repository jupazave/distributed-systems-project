'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './concepts-edit.routes';

export class ConceptsEditComponent {
  /*@ngInject*/
  constructor(Topic, Concept, $state, $stateParams, Auth, $scope, $on) {
    this.Topic = Topic;
    this.Concept = Concept;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.getCurrentUser = Auth.getCurrentUserSync;

  }

  $onInit(){
    this.topic = this.Topic.get({ id: this.$stateParams.topic_id });
    this.concept = this.Concept.get({ topic_id: this.$stateParams.topic_id,  id: this.$stateParams.id });
    this.concept.$promise.then(() =>{
      if(this.concept.editor_id != this.getCurrentUser()) this.concept.$lock();
    })
  }

  $scope.$on('$locationChangeStart', function(event) {
        var answer = confirm("Are you sure you want to leave this page?")
        if (!answer) {
            event.preventDefault();
        }
    });


  update() {
    this.concept.$update(() =>  {
      this.$state.go('topics-view', {id : this.topic.id});
    });
  };
}

export default angular.module('distributedApp.concepts-edit', [uiRouter])
  .config(routes)
  .component('conceptsEdit', {
    template: require('./concepts-edit.html'),
    controller: ConceptsEditComponent,
    controllerAs: 'ctrl'
  })
  .name;
