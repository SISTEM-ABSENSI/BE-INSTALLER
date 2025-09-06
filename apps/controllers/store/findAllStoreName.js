"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllStoreName = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const storeModel_1 = require("../../models/storeModel");
const findAllStoreName = async (req, res) => {
    try {
        const result = await storeModel_1.StoreModel.findAll({
            where: {
                deleted: 0
            },
            attributes: ['storeId', 'storeName'],
            order: [['storeId', 'desc']]
        });
        const response = response_1.ResponseData.success(result);
        logger_1.default.info('Store name retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllStoreName = findAllStoreName;
