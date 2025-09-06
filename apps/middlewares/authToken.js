"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutToken = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../utilities/response");
const logger_1 = __importDefault(require("../utilities/logger"));
const configs_1 = require("../configs");
const useAutToken = (req, res, next) => {
    try {
        const apiKey = req.headers['x-api-key'];
        if (!apiKey || typeof apiKey !== 'string') {
            const message = 'Missing or invalid API Key.';
            logger_1.default.warn(message);
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error(message));
            return;
        }
        if (!configs_1.APP_CONFIGS?.secret.authToken.includes(apiKey)) {
            const message = 'Invalid API Key.';
            logger_1.default.warn(message);
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error(message));
            return;
        }
        logger_1.default.info('API Key validated successfully');
        next();
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.useAutToken = useAutToken;
