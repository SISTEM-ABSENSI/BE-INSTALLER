"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const attendanceHistory_1 = require("../../controllers/attendanceHistory");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.middleware.useAuthorization, attendanceHistory_1.attendanceHistoryController.findAll);
router.get('/detail/:attendanceHistoryId', middlewares_1.middleware.useAuthorization, attendanceHistory_1.attendanceHistoryController.findDetail);
exports.default = router;
