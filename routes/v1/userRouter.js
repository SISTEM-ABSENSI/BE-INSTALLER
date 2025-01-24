"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const users_1 = require("../../controllers/users");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.middleware.useAuthorization, async (req, res) => await users_1.userController.findAll(req, res));
router.get('/detail/:userId', middlewares_1.middleware.useAuthorization, async (req, res) => await users_1.userController.findOne(req, res));
exports.default = router;
