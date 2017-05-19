'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import {isAdmin, filterUser} from '../policies';
import {isAuthenticated} from '../../auth/auth.service';

var router = new Router();

router.get('/', isAdmin(), controller.index);
router.post('/', controller.create);
router.get('/me', filterUser(), controller.me);
router.put('/:id/password', filterUser(), controller.changePassword);
router.get('/:id', isAdmin(), controller.show);
router.put('/:id', isAdmin(), controller.patch);
router.patch('/:id', isAdmin(), controller.patch);
router.delete('/:id', isAdmin(), controller.destroy);

// router.post('/reset', controller.resetAsk);
// router.get('/reset', controller.resetChange);
// router.post('/reset-confirm', controller.resetConfirm);

module.exports = router;
