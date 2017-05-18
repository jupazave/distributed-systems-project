'use strict';

const dev = require('../config/environment/development');
const test = require('../config/environment/test');
const prod = require('../config/environment/production');

module.exports = {
  "development":  {
    "url": dev.sequelize.uri,
    "dialect": "mysql"
  },
  "test":  {
    "url": test.sequelize.uri,
    "dialect": "sqlite"
  },
  "production":  {
    "url": prod.sequelize.uri,
    "dialect": "mysql"
  }
}
