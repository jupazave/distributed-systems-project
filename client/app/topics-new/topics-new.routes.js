'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('topics-new', {
      url: '/topic/new',
      template: '<topics-new></topics-new>'
    });
}
