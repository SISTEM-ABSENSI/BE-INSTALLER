"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const attendance_1 = require("../../controllers/attendance");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.get('/reports', middlewares_1.middleware.useAutToken, attendance_1.attendanceController.findAttendanceReport);
router.get('/', middlewares_1.middleware.useAuthorization, attendance_1.attendanceController.findAll);
router.get('/detail/:attendanceId', middlewares_1.middleware.useAuthorization, attendance_1.attendanceController.findDetail);
router.get('/last-status', middlewares_1.middleware.useAuthorization, attendance_1.attendanceController.findLastAttendance);
router.get('/last-all-status', middlewares_1.middleware.useAuthorization, attendance_1.attendanceController.findAllLastStatusAttendance);
router.post('/', middlewares_1.middleware.useAuthorization, attendance_1.attendanceController.create);
exports.default = router;
