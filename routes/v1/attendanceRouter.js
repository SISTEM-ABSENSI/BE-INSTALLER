"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const attendance_1 = require("../../controllers/attendance");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.get('/', attendance_1.attendanceController.findAllAttendance);
router.get('/detail/:scheduleId', attendance_1.attendanceController.findOneAttendance);
router.patch('/', middlewares_1.middleware.useAuthorization, attendance_1.attendanceController.attendance);
exports.default = router;
