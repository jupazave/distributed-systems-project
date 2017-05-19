'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('topics', {
      url: '/topic',
      template: '<topics></topics>'
    });
}
