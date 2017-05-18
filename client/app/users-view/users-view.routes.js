'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('users-view', {
      url: '/users/:id',
      template: '<users-view></users-view>'
    });
}
