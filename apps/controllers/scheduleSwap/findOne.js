"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneScheduleSwap = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const scheduleSwapSchema_1 = require("../../schemas/scheduleSwapSchema");
const scheduleSwapModel_1 = require("../../models/scheduleSwapModel");
const findOneScheduleSwap = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(scheduleSwapSchema_1.findOneScheduleSwapSchema, req.params);
    if (error != null) {
        const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const result = await scheduleSwapModel_1.ScheduleSwapModel.findOne({
            where: {
                deleted: 0,
                scheduleSwapId: value.scheduleSwapId
            }
        });
        if (result == null) {
            const message = `Schedule swap not found with ID: ${value.scheduleSwapId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const response = response_1.ResponseData.success(result);
        logger_1.default.info('Schedule swap found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findOneScheduleSwap = findOneScheduleSwap;
