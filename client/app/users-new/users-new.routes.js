'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('users-new', {
      url: '/users/new',
      template: '<users-new></users-new>'
    });
}
