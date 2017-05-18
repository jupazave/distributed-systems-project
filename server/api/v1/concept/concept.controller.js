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
import {Brand, Smartcontroldef} from '../../../sqldb';
import log from './../../../libraries/Log';
import { _Error } from './../../../libraries/Error';
import { handleError } from './../utils';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      for (let key in patches) entity[key] = patches[key];
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      throw new _Error('notFound', "Brand not found");
    }
    return entity;
  };
}

// Gets a list of Brands
export function index(req, res) {
  return Brand.findAll({ include: [{ model: Smartcontroldef, attributes: ['id', 'model']}]})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Brand from the DB
export function show(req, res) {
  return Brand.find({
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
  return Brand.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Brand in the DB at the specified ID
export function upsert(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }

  return Brand.upsert(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Brand in the DB
export function patch(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }
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
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
