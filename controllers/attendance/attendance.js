"use strict";
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendance = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const attendanceSchema_1 = require("../../schemas/attendanceSchema");
const scheduleModel_1 = require("../../models/scheduleModel");
const attendanceHistoryModel_1 = require("../../models/attendanceHistoryModel");
const moment_1 = __importDefault(require("moment"));
const attendance = async (req, res) => {
    console.log('___________value______');
    console.log(req.body);
    console.log('___________value______');
    const { error, value } = (0, validateRequest_1.validateRequest)(attendanceSchema_1.updateAttendanceSchema, {
        ...req.body
    });
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const scheduleRecord = await scheduleModel_1.ScheduleModel.findOne({
            where: { deleted: 0, scheduleId: value.attendanceId }
        });
        if (scheduleRecord === null) {
            const message = 'Attendance record not found';
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const currentTime = (0, moment_1.default)();
        const startDate = (0, moment_1.default)(scheduleRecord.scheduleStartDate);
        const endDate = (0, moment_1.default)(scheduleRecord.scheduleEndDate);
        // Check if trying to check in before start date
        if (currentTime.isBefore(startDate)) {
            const message = 'Cannot check in before scheduled start time';
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
        }
        let newStatus = null;
        // Check if past end date
        if (scheduleRecord.scheduleStatus === 'waiting') {
            newStatus = 'checkin';
        }
        else if (scheduleRecord.scheduleStatus === 'checkin') {
            newStatus = 'checkout';
        }
        if (currentTime.isAfter(endDate)) {
            scheduleRecord.scheduleOntime = false;
        }
        else {
            scheduleRecord.scheduleOntime = true;
        }
        if (!newStatus) {
            const message = 'Invalid status transition';
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
        }
        console.log(newStatus);
        await scheduleModel_1.ScheduleModel.update({ ...value, scheduleStatus: newStatus }, {
            where: { deleted: 0, scheduleId: value.attendanceId }
        });
        const attendanceHistoryPayload = {
            attendanceHistoryTime: value.attendanceTime,
            attendanceHistoryCategory: newStatus,
            attendanceHistoryUserId: scheduleRecord.scheduleUserId,
            attendanceHistoryPhoto: value.attendancePhoto,
            attendanceHistoryScheduleId: value.attendanceId
        };
        await attendanceHistoryModel_1.AttendanceHistoryModel.create(attendanceHistoryPayload);
        const response = response_1.ResponseData.success({
            message: `Attendance updated to ${newStatus} successfully`
        });
        logger_1.default.info(`Attendance updated to ${newStatus} successfully`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.attendance = attendance;
