'use strict';

var express = require('express');
var controller = require('./topic.controller');

import {isAuthenticated} from './../../auth/auth.service';

var router = express.Router();

router.get('/', isAuthenticated(), controller.index);
router.get('/:id', isAuthenticated(), controller.show);
router.post('/', isAuthenticated(), controller.create);
router.put('/:id', isAuthenticated(), controller.edit);
router.patch('/:id', isAuthenticated(), controller.edit);
router.delete('/:id', isAuthenticated(), controller.destroy);

//router.get('/:id/editing', isAuthenticated(), controller.setEditMode);
//router.get('/:id/can_edit', isAuthenticated(), controller.canEdit);


module.exports = router;
