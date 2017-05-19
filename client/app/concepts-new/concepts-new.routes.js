'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('concepts-new', {
      url: '/topic/:topic_id/concept/new',
      template: '<concepts-new></concepts-new>'
    });
}
