'use strict';

import config from './../../config/environment';
import { hasRole } from './../auth/auth.service';
import compose from 'composable-middleware';
import * as sqldb from './../../sqldb';

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function isOwner(model){

  //var model = req.options.model || req.options.controller;
  if (!model) throw new Error('No "model" specified in route options.');

  var Model = sqldb[model];

  return function meetsRequirements(req, res, next) {

    Model.findOne({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        if(!result) return res.notFound("No item found").end();
        if(result.user_id !== req.user.id) return res.forbidden();

        next();
        return null;
      })
      .catch(err => next(err));
  };

};

export function isAdmin() {

  return compose()
    .use(hasRole('admin'));
}


/**
 * Appends userId to the insert/update query
 */
export function appendUser() {

  return compose()
    .use(hasRole('user'))
    .use(function meetsRequirements(req, res, next) {
      if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf('admin')) {
        return next();
      }

      if(!req.body) req.body = {};
      req.body.user_id = req.user.id;
      next();

    });
}

/**
 *  Adds userId to the query
 */
export function filterUser() {

  return compose()
    .use(hasRole('user'))
    .use(function meetsRequirements(req, res, next) {
      if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf('admin')) {
        return next();
      }

      if(!req.options) req.options = {};
      if(!req.options.where) req.options.where = {};

      req.options.where.user_id = req.user.id;

      next();

    });
}
