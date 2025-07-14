"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttendance = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const scheduleModel_1 = require("../../models/scheduleModel");
const attendanceModel_1 = require("../../models/attendanceModel");
const attendanceSchema_1 = require("../../schemas/attendanceSchema");
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const createAttendance = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(attendanceSchema_1.createAttendanceSchema, {
        ...req.body
    });
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const payload = value;
    try {
        const scheduleRecord = await scheduleModel_1.ScheduleModel.findOne({
            where: {
                deleted: 0,
                scheduleId: payload.attendanceScheduleId,
                scheduleUserId: req.body?.jwtPayload?.userId
            }
        });
        if (scheduleRecord === null) {
            const message = 'Schedule not found';
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const checkExistingActiveschedule = await scheduleModel_1.ScheduleModel.findOne({
            where: {
                deleted: 0,
                scheduleId: { [sequelize_1.Op.not]: payload.attendanceScheduleId },
                scheduleStatus: 'progress',
                scheduleUserId: req.body?.jwtPayload?.userId
            }
        });
        if (checkExistingActiveschedule && payload.attendanceCategory === 'checkin') {
            const message = `Active schedule found (${checkExistingActiveschedule.scheduleName}), can't create new attendance`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
        }
        if (payload.attendanceCategory === 'checkin') {
            await scheduleModel_1.ScheduleModel.update({ ...value, scheduleStatus: 'progress' }, {
                where: {
                    deleted: 0,
                    scheduleId: payload.attendanceScheduleId
                }
            });
        }
        if (payload.attendanceCategory === 'checkout') {
            await scheduleModel_1.ScheduleModel.update({ ...value, scheduleStatus: 'done' }, {
                where: {
                    deleted: 0,
                    scheduleId: payload.attendanceScheduleId
                }
            });
        }
        const attendanceRecord = await attendanceModel_1.AttendanceModel.findOne({
            where: {
                deleted: 0,
                attendanceScheduleId: payload.attendanceScheduleId,
                attendanceCategory: payload.attendanceCategory
            }
        });
        // pritend duplicate attendance category
        if (attendanceRecord === null) {
            payload.attendanceTime = (0, moment_1.default)().toISOString();
            payload.attendanceUserId = req.body?.jwtPayload?.userId;
            await attendanceModel_1.AttendanceModel.create(payload);
        }
        const response = response_1.ResponseData.success();
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.createAttendance = createAttendance;
