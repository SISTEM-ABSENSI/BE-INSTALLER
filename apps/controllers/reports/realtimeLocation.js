"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationTracker = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const locationTracker_1 = require("../../models/locationTracker");
const validateRequest_1 = require("../../utilities/validateRequest");
const reportSchema_1 = require("../../schemas/reportSchema");
const locationTracker = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(reportSchema_1.createRealtimeLocation, req.body);
    if (error != null) {
        const message = `Invalid query parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const payload = {
            locationTrackerUserId: req.body?.jwtPayload?.userId,
            locationTrackerLongitude: req.body.locationTrackerLongitude,
            locationTrackerLatitude: req.body.locationTrackerLatitude
        };
        await locationTracker_1.LocationTrackerModel.create(payload);
        return res.status(http_status_codes_1.StatusCodes.OK).json({});
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.locationTracker = locationTracker;
