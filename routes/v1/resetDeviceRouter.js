"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const resetDevice_1 = require("../../controllers/resetDevice");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.middleware.useAuthorization, middlewares_1.middleware.allowRoles('admin', 'superAdmin'), resetDevice_1.resetDeviceControllers.findAll);
router.get('/detail/:resetDeviceId', middlewares_1.middleware.useAuthorization, middlewares_1.middleware.allowRoles('admin', 'superAdmin'), resetDevice_1.resetDeviceControllers.findDetail);
router.get('/by-device-id/:deviceId', resetDevice_1.resetDeviceControllers.findByDeviceId);
router.post('/', resetDevice_1.resetDeviceControllers.create);
router.patch('/', middlewares_1.middleware.useAuthorization, middlewares_1.middleware.allowRoles('admin', 'superAdmin'), resetDevice_1.resetDeviceControllers.update);
exports.default = router;
