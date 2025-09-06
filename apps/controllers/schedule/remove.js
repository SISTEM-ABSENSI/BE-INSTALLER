"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSchedule = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const scheduleSchema_1 = require("../../schemas/scheduleSchema");
const scheduleModel_1 = require("../../models/scheduleModel");
const removeSchedule = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(scheduleSchema_1.deleteScheduleSchema, req.params);
    if (error != null) {
        const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const result = await scheduleModel_1.ScheduleModel.findOne({
            where: {
                deleted: 0,
                scheduleId: value.scheduleId
            }
        });
        if (result == null) {
            const message = `Schedule not found with ID: ${value.scheduleId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        result.deleted = 1;
        void result.save();
        const response = response_1.ResponseData.success({ message: 'Schedule deleted successfully' });
        logger_1.default.info('Schedule deleted successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.removeSchedule = removeSchedule;
