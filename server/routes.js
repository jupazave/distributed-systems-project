/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

var topics = require('./api/v1/topic/topic.controller');
var concepts = require('./api/v1/concept/concept.controller');

import {isAuthenticated} from './api/auth/auth.service';

export default function(app) {
  // Insert routes below

  app.get('/api/v1/topics', isAuthenticated(), topics.index);
  app.get('/api/v1/topics/:id', isAuthenticated(), topics.show);
  app.post('/api/v1/topics', isAuthenticated(), topics.create);
  app.put('/api/v1/topics/:id', isAuthenticated(), topics.edit);
  app.patch('/api/v1/topics/:id', isAuthenticated(), topics.edit);
  app.delete('/api/v1/topics/:id', isAuthenticated(), topics.destroy);

  app.get('/api/v1/topics/:topic_id/concepts', isAuthenticated(), concepts.index);
  app.get('/api/v1/topics/:topic_id/concepts/:id', isAuthenticated(), concepts.show);
  app.post('/api/v1/topics/:topic_id/concepts', isAuthenticated(), concepts.create);
  app.put('/api/v1/topics/:topic_id/concepts/:id', isAuthenticated(), concepts.edit);
  app.patch('/api/v1/topics/:topic_id/concepts/:id', isAuthenticated(), concepts.edit);
  app.delete('/api/v1/topics/:topic_id/concepts/:id', isAuthenticated(), concepts.destroy);

  //app.use('/api/v1/journals', require('./api/v1/journal'));

  app.use('/api/v1/users', require('./api/v1/user'));
  app.use('/api/auth', require('./api/auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
