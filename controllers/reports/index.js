"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportController = void 0;
const findAll_1 = require("./findAll");
const realtimeLocation_1 = require("./realtimeLocation");
const realtimeReport_1 = require("./realtimeReport");
exports.reportController = {
    findAll: findAll_1.findAllReportAttendance,
    locationTracker: realtimeLocation_1.locationTracker,
    findAllRealtimeReport: realtimeReport_1.findAllRealtimeReport
};
