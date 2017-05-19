'use strict';
const angular = require('angular');

/*@ngInject*/
export function journalService($resource) {
  return $resource('/api/v1/journals/:id/:controller', { id:'@id' }, {
    all: { method: 'GET', isArray: true },
    get: { method: 'GET', isArray: false }
  });
}

export default angular.module('distributedApp.journal', [])
  .service('Journal', journalService)
  .name;
