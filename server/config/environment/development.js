'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: process.env.SEQUELIZE_URI || 'mysql://root@localhost/distributed',
    options: {
      logging: false,
      define: {
        timestamps: true
      }
    }
  },
  // Seed database on startup
  seedDB: (process.env.SEED !== undefined) || false

};
