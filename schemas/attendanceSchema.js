"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAttendanceSchema = exports.findLastAttendanceSchema = exports.findDetailAttendanceSchema = exports.createAttendanceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createAttendanceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    attendanceScheduleId: joi_1.default.number().integer().positive().required(),
    attendanceStoreId: joi_1.default.number().integer().positive().required(),
    attendancePhoto: joi_1.default.string().optional().allow(''),
    attendanceCategory: joi_1.default.string()
        .valid('checkin', 'checkout', 'breakin', 'breakout', 'otin', 'otout')
        .required()
});
exports.findDetailAttendanceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    attendanceId: joi_1.default.number().integer().positive().required()
});
exports.findLastAttendanceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    scheduleId: joi_1.default.number().integer().positive().required()
});
exports.findAllAttendanceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional(),
    attendanceScheduleId: joi_1.default.number().integer().positive().optional(),
    attendanceCategory: joi_1.default.string()
        .valid('checkin', 'checkout', 'breakin', 'breakout', 'otin', 'otout')
        .optional()
        .allow('')
});
