"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const storeLocation_1 = require("../../controllers/storeLocation");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.middleware.useAuthorization, middlewares_1.middleware.allowRoles('admin', 'superAdmin'), storeLocation_1.storeLocationController.findAll);
exports.default = router;
