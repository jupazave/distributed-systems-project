'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('topics-view', {
      url: '/topic/:id',
      template: '<topics-view></topics-view>'
    });
}
