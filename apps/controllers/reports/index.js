"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportController = void 0;
const findAll_1 = require("./findAll");
const findAllByDay_1 = require("./findAllByDay");
exports.reportController = {
    findAll: findAll_1.findAllReportAttendance,
    findAllReportByDay: findAllByDay_1.findAllReportByDay
};
