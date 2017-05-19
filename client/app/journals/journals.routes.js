'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('journals', {
      url: '/journal',
      template: '<journals></journals>'
    });
}
