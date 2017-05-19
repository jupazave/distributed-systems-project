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
import {Topic, Concept, User} from '../../../sqldb';
import { handleError } from './../utils';
import JournalService from "../../../services/JournalService";

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

    JournalService.topicAction(user_id, 'edit', topic.name, topic.id);
    return topic.save();
  };
}

function removeEntity(req, res) {
  return function(topic) {
    if(topic) {

      let user_id = req.user.id;

      if(topic.Concepts.length > 0) return res.status(403).json({error: 'Topic has concepts'}).end();
      // if(topic.user_id != user_id) return res.status(403).json({error: 'Topic dows not belongs to you'}).end();

      JournalService.topicAction(user_id, 'delete', topic.name, topic.id);

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
      throw {msg: "Topic Not found", error: "notfound"};
    }
    return topic;
  };
}

// Gets a list of Topics
export function index(req, res) {
  return Topic.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Topic from the DB
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

// Creates a new Topic in the DB
export function create(req, res) {
  return Topic.create(req.body)
    .then((topic) => {
      JournalService.topicAction(req.user.id, 'new', topic.name, topic.id);
      return topic;
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Topic in the DB
export function edit(req, res) {
  if(req.body.id) delete req.body.id;

  return Topic.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Topic from the DB
export function destroy(req, res) {
  return Topic.find({
    where: {
      id: req.params.id
    },
    include: [{ model: Concept } ]
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(req, res))
    .catch(handleError(res));
}
