"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAttendanceHistoriesSchema = exports.findOneAttendanceHistorySchema = exports.updateAttendanceHistorySchema = exports.attendanceHistorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.attendanceHistorySchema = joi_1.default.object({
    attendanceHistoryId: joi_1.default.number().integer().positive().required(),
    attendanceHistoryUserId: joi_1.default.number().integer().positive().required(),
    attendanceHistoryTime: joi_1.default.string().isoDate().required(),
    attendanceHistoryPhoto: joi_1.default.string().required(),
    attendanceHistoryCategory: joi_1.default.string().valid('checkin', 'checkout').required()
});
exports.updateAttendanceHistorySchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    attendanceHistory: exports.attendanceHistorySchema.required()
});
exports.findOneAttendanceHistorySchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    attendanceHistoryId: joi_1.default.number().integer().positive().required()
});
exports.findAllAttendanceHistoriesSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().isoDate().optional(),
    endDate: joi_1.default.string().isoDate().optional(),
    attendanceHistoryUserId: joi_1.default.number().integer().positive().optional().allow(''),
    attendanceHistoryScheduleId: joi_1.default.number().integer().positive().optional().allow('')
});
