/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import {User} from '../sqldb';
import log from './../services/log.service';

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'jpablo@makerlab.mx',
      password: 'admin'
    }])
    .then(() => {
      log.debug('finished populating users');
    });
  });

