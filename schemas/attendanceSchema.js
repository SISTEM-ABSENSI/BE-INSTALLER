"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAttendanceSchema = exports.findOneAttendanceSchema = exports.updateAttendanceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.updateAttendanceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    attendanceId: joi_1.default.number().integer().positive().required(),
    attendancePhoto: joi_1.default.string().required()
});
exports.findOneAttendanceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    attendanceId: joi_1.default.number().integer().positive().required()
});
exports.findAllAttendanceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
