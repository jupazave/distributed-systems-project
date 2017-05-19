/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/v1/topics              ->  index
 * POST    /api/v1/topics              ->  create
 * GET     /api/v1/topics/:id          ->  show
 * PUT     /api/v1/topics/:id          ->  edit
 * PATCH   /api/v1/topics/:id          ->  edit
 * DELETE  /api/v1/topics/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Journal, Concept, User} from '../../../sqldb';
import { handleError } from './../utils';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(topic) {
    if(topic) {
      return res.status(statusCode).json(topic);
    }
    return null;
  };
}



function handleEntityNotFound(res) {
  return function(topic) {
    if(!topic) {
      throw {msg: "Journal Not found", error: "notfound"};
    }
    return topic;
  };
}

// Gets a list of Journals
export function index(req, res) {
  return Journal.findAll({
    include: [{model: User, attributes: ['name', 'email'] }]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Journal from the DB
export function show(req, res) {
  return Journal.find({
    where: {
      id: req.params.id
    },
    include: [{model: User, attributes: ['name', 'email'] }]
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
