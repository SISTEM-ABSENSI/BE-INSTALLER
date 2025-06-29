"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStore = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const storeSchema_1 = require("../../schemas/storeSchema");
const storeModel_1 = require("../../models/storeModel");
const updateStore = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(storeSchema_1.updateStoreSchema, {
        ...req.body
    });
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const store = await storeModel_1.StoreModel.findOne({
            where: { deleted: 0, storeId: value.storeId }
        });
        if (store === null) {
            const message = `storeId not found with ID: ${value.storeId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        await storeModel_1.StoreModel.update(value, {
            where: { deleted: 0, storeId: value.storeId }
        });
        const response = response_1.ResponseData.success({ message: 'storeId updated successfully' });
        logger_1.default.info('storeId updated successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.updateStore = updateStore;
