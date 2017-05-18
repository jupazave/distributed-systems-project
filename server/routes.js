/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below

  app.use('/api/v1/topics', require('./api/v1/topic'));
  app.use('/api/v1/concepts', require('./api/v1/concept'));
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
