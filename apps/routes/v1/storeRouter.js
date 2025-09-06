"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const store_1 = require("../../controllers/store");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.get('/', store_1.storeControllers.findAll);
router.get('/names', store_1.storeControllers.findAllStoreName);
router.get('/detail/:storeId', middlewares_1.middleware.useAuthorization, store_1.storeControllers.findOne);
router.post('/', middlewares_1.middleware.useAuthorization, store_1.storeControllers.create);
router.patch('/', middlewares_1.middleware.useAuthorization, store_1.storeControllers.update);
router.delete('/:storeId', middlewares_1.middleware.useAuthorization, store_1.storeControllers.remove);
exports.default = router;
