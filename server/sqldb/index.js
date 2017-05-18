/**
 * Sequelize initialization module
 */

'use strict';

//import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';
import _ from 'lodash';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

let models = {}

// Insert models below
models.User = db.sequelize.import('../api/v1/user/user.model');

let models_arry = Object.keys(models).map((k) => models[k]);

for(let model of models_arry) {
  let asocs = {};
  if(model.getAssociations != null) {
    asocs = model.getAssociations();
  }
  for(let k of Object.keys(asocs)) {
    let asoc = asocs[k];
    let options = _.omit(asoc, ['type', 'model']);
    if(model[asoc.type] != null){
      let relative = models[asoc.model];
      model[asoc.type](relative, options);
    } else {
      console.log('Invalid association type for model:', k, asoc)
      // log.warn('Invalid association type for model:', k, asoc)
    };
  }
}

db = _.merge(db, models);


module.exports = db;
