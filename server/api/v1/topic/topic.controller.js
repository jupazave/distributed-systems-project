/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/v1/brands              ->  index
 * POST    /api/v1/brands              ->  create
 * GET     /api/v1/brands/:id          ->  show
 * PUT     /api/v1/brands/:id          ->  upsert
 * PATCH   /api/v1/brands/:id          ->  patch
 * DELETE  /api/v1/brands/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Topic, Concept, User} from '../../../sqldb';
import log from './../../../libraries/Log';
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

function patchUpdates(patches) {
  return function(topic) {
    try {
      for (let key in patches) topic[key] = patches[key];
    } catch(err) {
      return Promise.reject(err);
    }

    return topic.save();
  };
}

function removeEntity(req, res) {
  return function(topic) {
    if(topic) {

      let user_id = req.user.id;

      if(topic.Concept.length > 0) return res.status(403).json({error: 'Topic has concepts'}).end();
      if(topic.user_id != user_id) return res.status(403).json({error: 'Topic dows not belongs to you'}).end();

      return topic.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(topic) {
    if(!topic) {
      throw new {msg: "Topic Not found", error: "notfound"}
    }
    return topic;
  };
}

// Gets a list of Brands
export function index(req, res) {
  return Topic.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Brand from the DB
export function show(req, res) {
  return Topic.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Brand in the DB
export function create(req, res) {
  return Topic.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Brand in the DB
export function edit(req, res) {
  if(req.body.id) delete req.body.id;

  return Brand.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Brand from the DB
export function destroy(req, res) {
  return Brand.find({
    where: {
      id: req.params.id
    },
    { include: [{ model: Concept]}
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(req, res))
    .catch(handleError(res));
}
