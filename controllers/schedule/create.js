"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchedule = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const scheduleModel_1 = require("../../models/scheduleModel");
const scheduleSchema_1 = require("../../schemas/scheduleSchema");
const storeModel_1 = require("../../models/storeModel");
const createSchedule = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(scheduleSchema_1.createScheduleSchema, req.body);
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const result = await storeModel_1.StoreModel.findOne({
            where: {
                deleted: 0,
                storeId: value.scheduleStoreId
            }
        });
        if (result == null) {
            const message = `Store not found with ID: ${value.scheduleStoreId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        value.scheduleUserId = req.body?.jwtPayload?.userId;
        await scheduleModel_1.ScheduleModel.create(value);
        const response = response_1.ResponseData.success();
        logger_1.default.info('schedule created successfully');
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.createSchedule = createSchedule;
