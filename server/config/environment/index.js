'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';
import log from './../../libraries/Log';

/*function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}*/

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  jwt: {
    secret: 'ufjlasdoy38qhosu9fwafaw0',
    access: {
      expiry: {
        unit: 'months',
        length: 2
      },
      subject: 'access',
      audience: 'user'
    },
    renew: {
      expiry: {
        unit: 'days',
        length: 7
      },
      subject: 'renew',
      audience: 'user'
    },
    reset: {
      expiry: {
        unit: 'hours',
        length: 12
      },
      subject: 'reset',
      audience: 'user'
    }
  },

  email: {
    auth: {
      api_key: process.env.EMAIL_API_KEY || 'key-1823444fa68e29fb9e0012a0bbfad65e',
      domain: process.env.EMAIL_DOMAIN || 'sandbox7b8c596a34e84b699e55c4c60d67faf4.mailgun.org'
    }
  },

  sequelize: {
    uri: process.env.SEQUELIZE_URI || 'mysql://root@localhost/enterprise',
    options: {
      timezone: 'utc',
      logging: function(query){
        log.debug("Sequalize Query", query);
      }
    }
  },
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require(`./${process.env.NODE_ENV}.js`) || {});
