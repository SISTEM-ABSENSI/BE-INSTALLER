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
const locationTracker = async (req, res) => {
    try {
        const payload = {
            locationTrackerUserId: req.body?.jwtPayload?.userId,
            locationTrackerLongitude: req.body.longitude,
            locationTrackerLatitude: req.body.latitude
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
