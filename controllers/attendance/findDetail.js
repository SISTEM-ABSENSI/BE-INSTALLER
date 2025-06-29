"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailAttendance = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const storeModel_1 = require("../../models/storeModel");
const user_1 = require("../../models/user");
const attendanceModel_1 = require("../../models/attendanceModel");
const attendanceSchema_1 = require("../../schemas/attendanceSchema");
const findDetailAttendance = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(attendanceSchema_1.findDetailAttendanceSchema, req.params);
    if (error != null) {
        const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const result = await attendanceModel_1.AttendanceModel.findOne({
            where: {
                deleted: 0,
                attendanceId: value.attendanceId
            },
            include: [
                {
                    model: storeModel_1.StoreModel,
                    as: 'store',
                    attributes: [
                        'storeId',
                        'storeName',
                        'storeAddress',
                        'storeLongitude',
                        'storeLatitude'
                    ]
                },
                {
                    model: user_1.UserModel,
                    as: 'user',
                    attributes: [
                        'userId',
                        'userName',
                        'userRole',
                        'userDeviceId',
                        'userWhatsappNumber'
                    ]
                }
            ]
        });
        if (result == null) {
            const message = `Schedule not found with ID: ${value.scheduleId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const response = response_1.ResponseData.success(result);
        logger_1.default.info('Schedule found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findDetailAttendance = findDetailAttendance;
