"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllStoreSchema = exports.findOneStoreSchema = exports.deleteStoreSchema = exports.updateStoreSchema = exports.createStoreSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createStoreSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    storeName: joi_1.default.string().max(100).required(),
    storeAddress: joi_1.default.string().required(),
    storeLongitude: joi_1.default.string().max(100).required(),
    storeLatitude: joi_1.default.string().max(100).required(),
    createdAt: joi_1.default.date().optional()
});
exports.updateStoreSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    storeId: joi_1.default.number().integer().positive().required(),
    storeName: joi_1.default.string().allow('').max(100).optional(),
    storeAddress: joi_1.default.string().allow('').required(),
    storeLongitude: joi_1.default.string().allow('').max(100).optional(),
    storeLatitude: joi_1.default.string().allow('').max(100).optional(),
});
exports.deleteStoreSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    storeId: joi_1.default.number().integer().positive().required()
});
exports.findOneStoreSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    storeId: joi_1.default.number().integer().positive().required()
});
exports.findAllStoreSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
