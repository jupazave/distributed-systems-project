/**
 * Main application file
 */

'use strict';
import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';
import log from './libraries/Log';


// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);


sqldb.sequelize.sync()
  .then(function() {
    if(config.seedDB) {
      require('./config/seed');
    }
    return Promise.resolve(true);
  })
  .then(() => {

    app.angularFullstack = server.listen(config.port, config.ip, function() {
      log.info('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
  })
  .catch(function(err) {
    log.error('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;
