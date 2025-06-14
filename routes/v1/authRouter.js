"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => await auth_1.authController.login(req, res));
router.post('/register', async (req, res) => await auth_1.authController.register(req, res));
exports.default = router;
