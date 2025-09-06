"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceHistoryController = void 0;
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
exports.attendanceHistoryController = {
    findAll: findAll_1.findAllAttendanceHistories,
    findDetail: findDetail_1.findDetailAttendanceHistory
};
