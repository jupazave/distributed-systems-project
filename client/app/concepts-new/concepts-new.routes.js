'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('concept-new', {
      url: '/topic/:topic_id/concept/new',
      template: '<concept-new></concept-new>'
    });
}
