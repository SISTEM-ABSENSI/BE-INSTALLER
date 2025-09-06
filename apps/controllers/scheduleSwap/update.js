"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScheduleSwap = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const scheduleSwapModel_1 = require("../../models/scheduleSwapModel");
const scheduleSwapSchema_1 = require("../../schemas/scheduleSwapSchema");
const scheduleModel_1 = require("../../models/scheduleModel");
const updateScheduleSwap = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(scheduleSwapSchema_1.updateScheduleSwapSchema, {
        ...req.body
    });
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const requestBody = value;
        const checkScheduleSwap = await scheduleSwapModel_1.ScheduleSwapModel.findOne({
            where: {
                deleted: 0,
                scheduleSwapId: requestBody.scheduleSwapId
            }
        });
        if (checkScheduleSwap === null) {
            const message = `Schedule swap not found`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const scheduleFromUserRequest = await scheduleModel_1.ScheduleModel.findOne({
            where: {
                deleted: 0,
                scheduleId: checkScheduleSwap.scheduleSwapScheduleId,
                scheduleUserId: checkScheduleSwap.scheduleSwapRequestUserId
            }
        });
        // check if user reviver who is update the data
        if (checkScheduleSwap?.scheduleSwapReciverUserId === req.body?.jwtPayload?.userId) {
            if (scheduleFromUserRequest && requestBody.scheduleSwapStatus === 'accepted') {
                const payload = {
                    scheduleName: scheduleFromUserRequest.scheduleName,
                    scheduleStoreId: scheduleFromUserRequest.scheduleStoreId,
                    scheduleUserId: checkScheduleSwap.scheduleSwapReciverUserId,
                    scheduleStartDate: scheduleFromUserRequest.scheduleStartDate,
                    scheduleEndDate: scheduleFromUserRequest.scheduleEndDate,
                    scheduleStatus: 'waiting'
                };
                await scheduleModel_1.ScheduleModel.create(payload);
                checkScheduleSwap.scheduleSwapStatus = requestBody.scheduleSwapStatus;
                void checkScheduleSwap.save();
                scheduleFromUserRequest.deleted = 1;
                void scheduleFromUserRequest.save();
            }
            else {
                checkScheduleSwap.scheduleSwapStatus = requestBody.scheduleSwapStatus;
                void checkScheduleSwap.save();
                if (scheduleFromUserRequest) {
                    scheduleFromUserRequest.scheduleStatus = 'waiting';
                    void scheduleFromUserRequest?.save();
                }
            }
        }
        // check if user request who is update the data
        if (checkScheduleSwap?.scheduleSwapRequestUserId === req.body?.jwtPayload?.userId &&
            requestBody.scheduleSwapStatus === 'cancelled') {
            checkScheduleSwap.scheduleSwapStatus = requestBody.scheduleSwapStatus;
            void checkScheduleSwap.save();
            if (scheduleFromUserRequest) {
                scheduleFromUserRequest.scheduleStatus = 'waiting';
                void scheduleFromUserRequest?.save();
            }
        }
        const response = response_1.ResponseData.success();
        logger_1.default.info('Schedule swap updated successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.updateScheduleSwap = updateScheduleSwap;
