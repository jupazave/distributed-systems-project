'use strict';
const angular = require('angular');

/*@ngInject*/
export function conceptService($resource) {
  return $resource('/api/v1/topics/:topic_id/concepts/:id/:controller', { id:'@id', topic_id:'@topic_id' }, {
    all: { method: 'GET', isArray: true },
    get: { method: 'GET', isArray: false },
    create: { method: 'POST' },
    update: { method: 'PATCH' },
    delete: { method: 'DELETE' }
  });
}

export default angular.module('distributedApp.concept', [])
  .service('Concept', conceptService)
  .name;
