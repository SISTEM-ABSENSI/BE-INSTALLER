"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllResetDeviceSchema = exports.findDetailResetDeviceByDeviceIdSchema = exports.findDetailResetDeviceSchema = exports.updateResetDeviceSchema = exports.createResetDeviceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createResetDeviceSchema = joi_1.default.object({
    resetDeviceWhatsappNumber: joi_1.default.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required(),
    resetDeviceDeviceId: joi_1.default.string().min(1).max(255).required()
});
exports.updateResetDeviceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    resetDeviceId: joi_1.default.number().integer().positive().required(),
    resetDeviceStatus: joi_1.default.string().valid('waiting', 'accepted', 'rejected').required()
});
exports.findDetailResetDeviceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    resetDeviceId: joi_1.default.number().integer().positive().required()
});
exports.findDetailResetDeviceByDeviceIdSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    deviceId: joi_1.default.string().required()
});
exports.findAllResetDeviceSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    resetDeviceStatus: joi_1.default.string()
        .valid('waiting', 'accepted', 'rejected')
        .allow('')
        .optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().isoDate().allow('').optional(),
    endDate: joi_1.default.string().isoDate().allow('').optional(),
    deviceId: joi_1.default.string().optional().allow('')
});
