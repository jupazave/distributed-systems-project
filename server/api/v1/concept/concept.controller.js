/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/v1/concepts              ->  index
 * POST    /api/v1/concepts              ->  create
 * GET     /api/v1/concepts/:id          ->  show
 * PUT     /api/v1/concepts/:id          ->  edit
 * PATCH   /api/v1/concepts/:id          ->  edit
 * DELETE  /api/v1/concepts/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Topic, Concept, User} from '../../../sqldb';
import { handleError } from './../utils';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(concept) {
    if(concept) {
      return res.status(statusCode).json(concept);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(concept) {
    try {
      for (let key in patches) concept[key] = patches[key];
    } catch(err) {
      return Promise.reject(err);
    }

    return concept.save();
  };
}

function removeEntity(req, res) {
  return function(concept) {
    if(concept) {

      let user_id = req.user.id;

      //if(concept.Concept.length > 0) return res.status(403).json({error: 'Concept has concepts'}).end();
      if(concept.user_id != user_id) return res.status(403).json({error: 'Concept does not belongs to you'}).end();

      return concept.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(concept) {
    if(!concept) {
      throw new {msg: "Concept Not found", error: "notfound"}
    }
    return concept;
  };
}

// Gets a list of Concepts
export function index(req, res) {
  return Concept.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Concept from the DB
export function show(req, res) {
  return Concept.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Concept in the DB
export function create(req, res) {

  let body = req.body;

  body.user_id = req.user.id;

  return Concept.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Concept in the DB
export function edit(req, res) {
  if(req.body.id) delete req.body.id;

  return Concept.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Concept from the DB
export function destroy(req, res) {
  return Concept.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(req, res))
    .catch(handleError(res));
}
