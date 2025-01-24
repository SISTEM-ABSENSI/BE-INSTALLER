"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.userSchema = exports.findOneUserSchema = exports.findAllUsersSchema = exports.userRegistrationSchema = exports.userLoginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.userLoginSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userName: joi_1.default.string().required(),
    userPassword: joi_1.default.string().required(),
    userDeviceId: joi_1.default.string().optional().allow('')
});
exports.userRegistrationSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userName: joi_1.default.string().required(),
    userRole: joi_1.default.string().valid('admin', 'superAdmin', 'user').required(),
    userPassword: joi_1.default.string().min(6).required(),
    userDeviceId: joi_1.default.string().optional().allow(''),
    userContact: joi_1.default.string().optional().allow('')
});
exports.findAllUsersSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().min(0).default(0).optional(),
    size: joi_1.default.number().integer().min(1).default(10).optional(),
    userRole: joi_1.default.string().allow('').optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().default(true).optional(),
    userId: joi_1.default.string().optional().allow('')
});
exports.findOneUserSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userId: joi_1.default.string().required()
});
exports.userSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userId: joi_1.default.string().required(),
    userName: joi_1.default.string().min(3).max(30).required(),
    userPassword: joi_1.default.string().min(6).max(128).required(),
    userRole: joi_1.default.string().valid('admin', 'superAdmin', 'user').required(),
    userDeviceId: joi_1.default.string().optional(),
    userContact: joi_1.default.string().optional()
});
exports.updateUserSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userId: joi_1.default.string().optional().allow(''),
    userName: joi_1.default.string().allow('').min(3).max(30).optional(),
    userPassword: joi_1.default.string().allow('').min(6).max(128).optional(),
    userContact: joi_1.default.string().allow('').optional(),
    userRole: joi_1.default.string()
        .allow('')
        .valid('admin', 'superAdmin', 'user')
        .optional()
        .optional()
});
