'use strict';

import {User, Profile} from '../../../sqldb';
import config from '../../../config/environment';
import jwt from 'jsonwebtoken';
import jsonpatch from 'fast-json-patch';
import * as moment from 'moment';
import log from './../../../libraries/Log';
import { _Error } from './../../../libraries/Error';
import { handleError } from './../utils';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(user) {
    if(user) {
      return res.status(statusCode).json(user.profile);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(user) {
    try {

      user.name = patches.name || user.name;
      user.email = patches.email || user.email;
      if(patches.password){
        user.password = patches.password;
      }

    } catch(err) {
      return Promise.reject(err);
    }

    return user.save();
  };
}

function handleEntityNotFound(res) {
  return function(user) {
    if(!user) {
      throw new _Error('notFound', "User not found");
    }
    return user;
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.findAll({
    where: {
      role: 'user'
    },
    attributes: [
      'id',
      'name',
      'email',
      'role',
      'provider',
      'enable'
    ]
  })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = User.build(req.body);
  newUser.setDataValue('provider', 'local');
  newUser.setDataValue('role', 'user');
  newUser.setDataValue('enable', true);

  let results = {};

  return newUser.save()
    .then(function(user) {
      var token = jwt.sign({ id: user.id }, config.jwt.secret, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.find({
    where: {
      id: userId
    }
  })
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

// Updates an existing User in the DB
export function patch(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }
  return User.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.destroy({ where: { id: req.params.id } })
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user.id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.find({
    where: {
      id: userId
    }
  })
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user.id;

  return User.find({
    where: {
      id: userId
    },
    attributes: [
      'id',
      'name',
      'email',
      'role',
      'provider'
    ]
  })
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}

