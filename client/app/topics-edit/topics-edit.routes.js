'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('topics-edit', {
      url: '/topic/:id/edit',
      template: '<topics-edit></topics-edit>'
    });
}
