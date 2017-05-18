'use strict';

export function UserResource($resource) {
  'ngInject';

  return $resource('/api/v1/users/:id/:controller', {
    id: '@id'
  }, {
    all           : { method: 'GET', isArray: true },
    get           : { method: 'GET', isArray: false },
    create        : { method: 'POST' },
    update        : { method: 'PUT' },
    delete        : { method: 'DELETE' },
    changePassword: { method: 'PUT', params: { controller: 'password' } },
    reset : { method: 'POST', params: { id: 'reset' } },
    me    : { method: 'GET', params: { id: 'me' } },
    toggle: { method: 'GET', isArray: false, params: {controller: 'toggle'} },
  });
}
