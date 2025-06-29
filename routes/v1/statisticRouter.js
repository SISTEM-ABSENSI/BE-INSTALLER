"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const statistic_1 = require("../../controllers/statistic");
const router = (0, express_1.Router)();
router.get('/total', middlewares_1.middleware.useAuthorization, statistic_1.statisticController.findTotal);
router.get('/productivities', middlewares_1.middleware.useAuthorization, statistic_1.statisticController.productivities);
exports.default = router;
