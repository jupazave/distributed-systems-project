'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('users-edit', {
      url: '/users/:id/edit',
      template: '<users-edit></users-edit>'
    });
}
