"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRegistrationSchema = exports.adminLoginSchema = exports.updateAdminSchema = exports.removeAdminSchema = exports.findDetailAdminSchema = exports.findAllAdminSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.findAllAdminSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().min(0).default(0).optional(),
    size: joi_1.default.number().integer().min(1).default(10).optional(),
    userRole: joi_1.default.string().allow('').optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().default(true).optional(),
    userId: joi_1.default.string().optional().allow('')
});
exports.findDetailAdminSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userId: joi_1.default.string().required()
});
exports.removeAdminSchema = joi_1.default.object({
    userId: joi_1.default.string().required()
});
exports.updateAdminSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userId: joi_1.default.number(),
    userName: joi_1.default.string().allow('').min(3).max(30).optional(),
    userPassword: joi_1.default.string().allow('').min(6).max(128).optional(),
    userWhatsappNumber: joi_1.default.string().allow('').optional(),
    userRole: joi_1.default.string()
        .allow('')
        .valid('admin', 'superAdmin', 'user')
        .optional()
        .optional()
});
exports.adminLoginSchema = joi_1.default.object({
    userWhatsappNumber: joi_1.default.string().required(),
    userPassword: joi_1.default.string().required(),
    userDeviceId: joi_1.default.string().optional().allow('')
});
exports.adminRegistrationSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    userName: joi_1.default.string().required(),
    userRole: joi_1.default.string().valid('admin', 'superAdmin', 'user').required(),
    userPassword: joi_1.default.string().min(6).required(),
    userDeviceId: joi_1.default.string().optional().allow(''),
    userWhatsappNumber: joi_1.default.string().required()
});
