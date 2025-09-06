"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScheduleSwap = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const scheduleSwapModel_1 = require("../../models/scheduleSwapModel");
const scheduleSwapSchema_1 = require("../../schemas/scheduleSwapSchema");
const scheduleModel_1 = require("../../models/scheduleModel");
const createScheduleSwap = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(scheduleSwapSchema_1.createScheduleSwapSchema, req.body);
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const requestBody = value;
        const checkSchedule = await scheduleModel_1.ScheduleModel.findOne({
            where: {
                deleted: 0,
                scheduleUserId: req.body?.jwtPayload?.userId,
                scheduleId: requestBody.scheduleSwapScheduleId
            }
        });
        if (checkSchedule === null) {
            const message = `Schedule not found`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        if (checkSchedule && checkSchedule?.scheduleStatus !== 'waiting') {
            const message = `Tidak bisa menukar jadwal yang sedang berjalan atau sudah selesai`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
        }
        const checkScheduleSwap = await scheduleSwapModel_1.ScheduleSwapModel.findOne({
            where: {
                deleted: 0,
                scheduleSwapScheduleId: requestBody.scheduleSwapScheduleId
            }
        });
        if (checkScheduleSwap && checkScheduleSwap?.scheduleSwapStatus == 'pending') {
            const message = `Jadwal sudah di ajukan, sedang menunggu konfirmasi`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
        }
        requestBody.scheduleSwapStatus = 'pending';
        requestBody.scheduleSwapRequestUserId = req.body?.jwtPayload?.userId;
        await scheduleSwapModel_1.ScheduleSwapModel.create(requestBody);
        checkSchedule.scheduleStatus = 'swap';
        void checkSchedule.save();
        const response = response_1.ResponseData.success();
        logger_1.default.info('schedule swap created successfully');
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.createScheduleSwap = createScheduleSwap;
