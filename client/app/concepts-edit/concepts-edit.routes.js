'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('concepts-edit', {
      url: '/topic/:topic_id/concept/:id/edit',
      template: '<concepts-edit></concepts-edit>'
    });
}
