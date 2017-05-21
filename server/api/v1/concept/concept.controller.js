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
import JournalService from "../../../services/JournalService";

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(concept) {
    if(concept) {
      return res.status(statusCode).json(concept);
    }
    return null;
  };
}

function patchUpdates(patches, user_id) {
  return function(concept) {
    try {
      for (let key in patches) concept[key] = patches[key];
      concept['editor_id'] = null;
    } catch(err) {
      return Promise.reject(err);
    }

    JournalService.conceptAction(user_id, 'edit', concept.name, concept.id);
    return concept.save();
  };
}

function removeEntity(req, res) {
  return function(concept) {
    if(concept) {

      let user_id = req.user.id;

      //if(concept.Concept.length > 0) return res.status(403).json({error: 'Concept has concepts'}).end();
      if(concept.user_id != user_id) return res.status(403).json({error: 'Concept does not belongs to you'}).end();

      JournalService.conceptAction(user_id, 'delete', concept.name, concept.id);


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
      throw {msg: "Concept Not found", error: "notfound"}
    }
    return concept;
  };
}

// Gets a list of Concepts
export function index(req, res) {
  return Concept.findAll({where: {topic_id: req.params.topic_id}})
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
  let user_id = req.user.id;

  return Concept.create(body)
    .then((concept) => {
      JournalService.conceptAction(user_id, 'new', concept.name, concept.id);
      return concept;
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Concept in the DB
export function edit(req, res) {
  console.log('---< EDIT >---');
  console.log('req.body', req.body);
  if(req.body.id) delete req.body.id;

  let user_id = req.user.id;

  return Concept.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body, user_id))
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

/**
 * Lock Concept
 */
export function lock(req, res) {
  console.log('---< LOCK >---');

  let user_id = req.user.id;
  let id = req.params.id;

  console.log('user_id: ', user_id);
  console.log('id: ', id);

  //-------
setTimeout(() => {

    Concept.find({
      where: {
        id: id
      }
    })
    .then(concept => {
      if(!concept) return;
      if (user_id == concept.editor_id) {
        concept.editor_id = null;
      }
      return concept.save();
    });

  }, 60000);
  //-------

    Concept.find({
      where: {
        id: id
      }
    })
    .then(concept => {
      if(!concept) return;

      if(concept.editor_id == null){
        console.log('nadie lo estaba edtando, el que lo edita ahora es ', user_id);
        concept.editor_id = user_id;
        concept.save();
        return res.end();
      } else {
        console.log('acceso denegado, quien lo esta editando es ', concept.editor_id);
        return res.end();
      }

    });
}

/**
 * Un Lock Concept
 */
export function unlock(req, res) {

  return Concept.find({
    where: {
      id: req.params.id
    }
  })
    .then(concept => {
      concept.editor_id = null;
      return concept.save();
    }).then(res.status(204).end())
    .catch(handleError(res));
}
