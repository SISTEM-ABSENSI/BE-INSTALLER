"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceController = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findAllLastStatusAttendance_1 = require("./findAllLastStatusAttendance");
const findDetail_1 = require("./findDetail");
const findLastAttendance_1 = require("./findLastAttendance");
exports.attendanceController = {
    create: create_1.createAttendance,
    findAll: findAll_1.findAllAttendance,
    findDetail: findDetail_1.findDetailAttendance,
    findAllLastStatusAttendance: findAllLastStatusAttendance_1.findAllLastStatusAttendance,
    findLastAttendance: findLastAttendance_1.findLastAttendance
};
