"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAttendance = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const storeModel_1 = require("../../models/storeModel");
const sequelize_1 = require("sequelize");
const user_1 = require("../../models/user");
const attendanceModel_1 = require("../../models/attendanceModel");
const attendanceSchema_1 = require("../../schemas/attendanceSchema");
const scheduleModel_1 = require("../../models/scheduleModel");
const findAllAttendance = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(attendanceSchema_1.findAllAttendanceSchema, req.query);
    if (error != null) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { page: queryPage, size: querySize, pagination, search, startDate, endDate, attendanceCategory, attendanceScheduleId, storeId } = value;
        const page = new pagination_1.Pagination(pagination ? parseInt(queryPage) || 0 : 0, pagination ? parseInt(querySize) || 10 : undefined);
        const dateFilter = startDate && endDate
            ? {
                createdAt: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
            : {};
        const result = await attendanceModel_1.AttendanceModel.findAndCountAll({
            where: {
                deleted: 0,
                ...(Boolean(req.body?.jwtPayload?.userRole === 'user') && {
                    attendanceUserId: req.body?.jwtPayload?.userId
                }),
                ...(Boolean(attendanceCategory) && {
                    attendanceCategory: attendanceCategory
                }),
                ...(Boolean(attendanceScheduleId) && {
                    attendanceScheduleId: attendanceScheduleId
                }),
                ...(Boolean(storeId) && {
                    attendanceStoreId: storeId
                }),
                ...dateFilter
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
                        'storeLatitude',
                        'storeMaximumDistanceAttendance',
                        'storeWifiMacAddress'
                    ]
                },
                {
                    model: scheduleModel_1.ScheduleModel,
                    as: 'schedule'
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
                    ],
                    where: search
                        ? {
                            [sequelize_1.Op.or]: [
                                sequelize_1.Sequelize.where(sequelize_1.Sequelize.col('user.user_name'), 'LIKE', `%${search}%`)
                            ]
                        }
                        : undefined
                }
            ],
            order: [['attendanceId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            }),
            distinct: true
        });
        const response = response_1.ResponseData.success(result);
        response.data = page.formatData(result);
        logger_1.default.info('Attendance records retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllAttendance = findAllAttendance;
