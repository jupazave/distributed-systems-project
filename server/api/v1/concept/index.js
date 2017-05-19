'use strict';

var express = require('express');
var controller = require('./concept.controller');

import {isAuthenticated} from './../../auth/auth.service';

var router = express.Router();

router.get('/', isAuthenticated(), controller.index);
router.get('/:id', isAuthenticated(), controller.show);
router.post('/', isAuthenticated(), controller.create);
router.put('/:id', isAuthenticated(), controller.edit);
router.patch('/:id', isAuthenticated(), controller.edit);
router.delete('/:id', isAuthenticated(), controller.destroy);


  app.use('/api/v1/topics/:topic_id/concepts', require('./api/v1/concept'));

module.exports = router;
