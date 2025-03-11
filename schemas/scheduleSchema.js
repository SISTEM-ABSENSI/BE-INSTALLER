"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllScheduleSchema = exports.findOneScheduleSchema = exports.deleteScheduleSchema = exports.updateScheduleSchema = exports.createScheduleSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
const todoListSchema_1 = require("./todoListSchema");
exports.createScheduleSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    scheduleName: joi_1.default.string().max(100).required(),
    scheduleDescription: joi_1.default.string().required(),
    scheduleStoreId: joi_1.default.number().integer().positive().required(),
    scheduleStartDate: joi_1.default.string().required(),
    scheduleEndDate: joi_1.default.string().required(),
    scheduleStatus: joi_1.default.string().valid('waiting', 'checkin', 'checkout').optional(),
    todoLists: joi_1.default.array().items(todoListSchema_1.createTodoListSchema).required()
});
exports.updateScheduleSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    scheduleId: joi_1.default.number().integer().positive().required(),
    scheduleName: joi_1.default.string().allow('').max(100).optional(),
    scheduleDescription: joi_1.default.string().allow('').optional(),
    scheduleStoreId: joi_1.default.number().allow('').integer().positive().optional(),
    scheduleStartDate: joi_1.default.string().required(),
    scheduleEndDate: joi_1.default.string().required(),
    scheduleStatus: joi_1.default.string()
        .allow('')
        .valid('waiting', 'checkin', 'checkout')
        .optional(),
    todoLists: joi_1.default.array().items(todoListSchema_1.createTodoListSchema).optional()
});
exports.deleteScheduleSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    scheduleId: joi_1.default.number().integer().positive().required()
});
exports.findOneScheduleSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    scheduleId: joi_1.default.number().integer().positive().required()
});
exports.findAllScheduleSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    scheduleStatus: joi_1.default.string().allow('').optional(),
    scheduleStatusNot: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
