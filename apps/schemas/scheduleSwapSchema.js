"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllScheduleSwapSchema = exports.findOneScheduleSwapSchema = exports.deleteScheduleSwapSchema = exports.updateScheduleSwapSchema = exports.createScheduleSwapSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createScheduleSwapSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    scheduleSwapReciverUserId: joi_1.default.number().integer().positive().required(),
    scheduleSwapScheduleId: joi_1.default.number().integer().positive().required()
});
exports.updateScheduleSwapSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    scheduleSwapId: joi_1.default.number().integer().positive().required(),
    scheduleSwapRequestUserId: joi_1.default.number().integer().positive().allow(null).optional(),
    scheduleSwapReciverUserId: joi_1.default.number().integer().positive().allow(null).optional(),
    scheduleSwapScheduleId: joi_1.default.number().integer().positive().allow(null).optional(),
    scheduleSwapStatus: joi_1.default.string()
        .valid('pending', 'accepted', 'rejected', 'cancelled')
        .allow(null)
        .optional()
});
exports.deleteScheduleSwapSchema = joi_1.default.object({
    scheduleSwapId: joi_1.default.number().integer().positive().required()
});
exports.findOneScheduleSwapSchema = joi_1.default.object({
    scheduleSwapId: joi_1.default.number().integer().positive().required()
});
exports.findAllScheduleSwapSchema = joi_1.default.object({
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    scheduleSwapStatus: joi_1.default.string()
        .valid('pending', 'accepted', 'rejected', 'cancelled')
        .allow('')
        .optional(),
    scheduleSwapCategory: joi_1.default.string().valid('request', 'reciver', 'all').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().isoDate().allow('').optional(),
    endDate: joi_1.default.string().isoDate().allow('').optional()
});
