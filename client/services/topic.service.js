'use strict';
const angular = require('angular');

/*@ngInject*/
export function topicService($resource) {
  return $resource('/api/v1/topics/:id/:controller', { id:'@id' }, {
    all: { method: 'GET', isArray: true },
    get: { method: 'GET', isArray: false },
    create: { method: 'POST' },
    update: { method: 'PATCH' },
    delete: { method: 'DELETE' }
  });
}

export default angular.module('distributedApp.topic', [])
  .service('Topic', topicService)
  .name;
