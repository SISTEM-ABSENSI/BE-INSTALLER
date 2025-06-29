"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const package_json_1 = __importDefault(require("../../../package.json"));
const logger_1 = __importDefault(require("../../utilities/logger"));
const startTime = Date.now();
const healthCheck = async (req, res) => {
    try {
        const uptimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
        const data = {
            app: package_json_1.default.name,
            version: package_json_1.default.version,
            environment: process.env.NODE_ENV || 'development',
            uptime: `${uptimeInSeconds}s`,
            timestamp: process.uptime()
        };
        const response = response_1.ResponseData.success({ data });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        const message = `Unable to process request! Error: ${serverError.message}`;
        logger_1.default.error(message, { stack: serverError.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.healthCheck = healthCheck;
