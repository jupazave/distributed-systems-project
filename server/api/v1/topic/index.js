'use strict';

var express = require('express');
var controller = require('./brand.controller');
import {isAdmin} from './../policies';
import {isAuthenticated} from './../../auth/auth.service';

var router = express.Router();

router.get('/', isAuthenticated(), controller.index);
router.get('/:id', isAdmin(), controller.show);
router.post('/', isAdmin(), controller.create);
router.put('/:id', isAdmin(), controller.upsert);
router.patch('/:id', isAdmin(), controller.patch);
router.delete('/:id', isAdmin(), controller.destroy);

module.exports = router;
