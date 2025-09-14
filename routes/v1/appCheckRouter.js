"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appCheck_1 = require("../../controllers/appCheck");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => await appCheck_1.appChekController.mainApp(req, res));
router.get('/health', async (req, res) => await appCheck_1.appChekController.healthCheck(req, res));
router.get('/settings', async (req, res) => await appCheck_1.appChekController.appSetting(req, res));
exports.default = router;
