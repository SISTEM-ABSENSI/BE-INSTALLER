"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAttendanceReportSchema = exports.findAllAttendanceSchema = exports.findAllLastStatusAttendanceSchema = exports.findLastAttendanceSchema = exports.findDetailAttendanceSchema = exports.createAttendanceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createAttendanceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    attendanceScheduleId: joi_1.default.number().integer().positive().required(),
    attendanceStoreId: joi_1.default.number().integer().positive().required(),
    attendancePhoto: joi_1.default.string().optional().allow(''),
    attendanceCategory: joi_1.default.string()
        .valid('checkin', 'checkout', 'breakin', 'breakout', 'otin', 'otout')
        .required(),
    attendanceLatitude: joi_1.default.number().optional().allow(''),
    attendanceLongitude: joi_1.default.number().optional().allow(''),
    attendanceDistanceFromStore: joi_1.default.number().optional().allow('')
});
exports.findDetailAttendanceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    attendanceId: joi_1.default.number().integer().positive().required()
});
exports.findLastAttendanceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    scheduleId: joi_1.default.number().integer().positive().required()
});
exports.findAllLastStatusAttendanceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema
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
    storeId: joi_1.default.alternatives()
        .try(joi_1.default.number(), joi_1.default.string().empty(''))
        .optional()
        .allow(null),
    attendanceCategory: joi_1.default.string()
        .valid('checkin', 'checkout', 'breakin', 'breakout', 'otin', 'otout')
        .optional()
        .allow('')
});
exports.findAttendanceReportSchema = joi_1.default.object({
    startDate: joi_1.default.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .optional()
        .messages({
        'string.pattern.base': 'Start date must be in YYYY-MM-DD format'
    }),
    endDate: joi_1.default.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .optional()
        .messages({
        'string.pattern.base': 'End date must be in YYYY-MM-DD format'
    }),
    page: joi_1.default.number().integer().min(0).optional().messages({
        'number.base': 'Page must be a number',
        'number.integer': 'Page must be an integer',
        'number.min': 'Page must be at least 0'
    }),
    size: joi_1.default.number().integer().min(1).optional().messages({
        'number.base': 'Size must be a number',
        'number.integer': 'Size must be an integer',
        'number.min': 'Size must be at least 1'
    }),
    pagination: joi_1.default.boolean().optional().messages({
        'boolean.base': 'Pagination must be a boolean'
    })
});
