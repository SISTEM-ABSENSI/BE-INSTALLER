"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const schedule_1 = require("../../controllers/schedule");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.middleware.useAuthorization, schedule_1.scheduleControllers.findAll);
router.get('/detail/:scheduleId', middlewares_1.middleware.useAuthorization, schedule_1.scheduleControllers.findOne);
router.post('/', middlewares_1.middleware.useAuthorization, middlewares_1.middleware.allowRoles('user'), schedule_1.scheduleControllers.create);
router.patch('/', middlewares_1.middleware.useAuthorization, middlewares_1.middleware.allowRoles('user'), schedule_1.scheduleControllers.update);
router.delete('/:scheduleId', middlewares_1.middleware.useAuthorization, middlewares_1.middleware.allowRoles('user'), schedule_1.scheduleControllers.remove);
exports.default = router;
