"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSetting = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const appSettingModel_1 = require("../../models/appSettingModel");
const appSetting = async (req, res) => {
    try {
        const result = await appSettingModel_1.AppSettingModel.findOne({
            where: {
                deleted: 0
            }
        });
        const response = response_1.ResponseData.success(result);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        const message = `Unable to process request! Error: ${serverError.message}`;
        logger_1.default.error(message, { stack: serverError.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.appSetting = appSetting;
