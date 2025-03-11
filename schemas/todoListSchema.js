"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllTodoListSchema = exports.findOneTodoListSchema = exports.deleteTodoListSchema = exports.updateTodoListSchema = exports.createTodoListSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createTodoListSchema = joi_1.default.object({
    todoListName: joi_1.default.string().max(100).required(),
    todoListScheduleId: joi_1.default.number().integer().positive().optional().allow(''),
    todoListStatus: joi_1.default.boolean().optional()
});
exports.updateTodoListSchema = joi_1.default.object({
    todoListId: joi_1.default.number().integer().positive().required(),
    todoListName: joi_1.default.string().allow('').max(100).optional(),
    todoListScheduleId: joi_1.default.number().allow('').integer().positive().optional(),
    todoListStatus: joi_1.default.boolean().optional()
});
exports.deleteTodoListSchema = joi_1.default.object({
    todoListId: joi_1.default.number().integer().positive().required()
});
exports.findOneTodoListSchema = joi_1.default.object({
    todoListId: joi_1.default.number().integer().positive().required()
});
exports.findAllTodoListSchema = joi_1.default.object({
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    todoListStatus: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
