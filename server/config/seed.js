/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import {User} from '../sqldb';

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.mx',
      password: 'admin'
    }])
    .then(() => {
      console.log('finished populating users');
    });
  });

