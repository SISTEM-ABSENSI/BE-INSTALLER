"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllReportByDay = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const user_1 = require("../../models/user");
const attendanceModel_1 = require("../../models/attendanceModel");
const scheduleModel_1 = require("../../models/scheduleModel");
const attendanceSchema_1 = require("../../schemas/attendanceSchema");
const pagination_1 = require("../../utilities/pagination");
const logger_1 = __importDefault(require("../../utilities/logger"));
const moment_1 = __importDefault(require("moment"));
const findAllReportByDay = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(attendanceSchema_1.findAllAttendanceSchema, req.query);
    if (error != null) {
        const message = `Invalid query parameter! ${error.details
            .map((x) => x.message)
            .join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { page: queryPage, size: querySize, search, pagination } = value;
    try {
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        const today = (0, moment_1.default)().format('YYYY-MM-DD');
        const todayStart = `${today} 00:00:00`;
        const todayEnd = `${today} 23:59:59`;
        const users = await user_1.UserModel.findAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userRole: 'user',
                ...(Boolean(search) && {
                    userName: { [sequelize_1.Op.like]: `%${search}%` }
                })
            },
            attributes: ['userId', 'userName']
        });
        const userIds = users.map((user) => user.userId);
        const reportData = new Map();
        users.forEach((user) => {
            const key = `${user.userId}-${today}`;
            reportData.set(key, {
                id: key,
                userName: user.userName,
                scheduleStartDate: null,
                scheduleStoreId: null,
                date: today,
                checkinAt: null,
                checkoutAt: null,
                breakinAt: null,
                breakoutAt: null,
                otinAt: null,
                otoutAt: null
            });
        });
        const attendances = await attendanceModel_1.AttendanceModel.findAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                attendanceUserId: { [sequelize_1.Op.in]: userIds },
                ...(Boolean(value?.storeId) && {
                    attendanceStoreId: value?.storeId
                }),
                attendanceTime: {
                    [sequelize_1.Op.between]: [todayStart, todayEnd]
                }
            },
            include: [
                {
                    model: scheduleModel_1.ScheduleModel,
                    as: 'schedule',
                    where: {
                        scheduleStartDate: {
                            [sequelize_1.Op.between]: [todayStart, todayEnd]
                        }
                    }
                }
            ],
            attributes: [
                'attendanceUserId',
                'attendanceCategory',
                'attendanceTime',
                'attendanceScheduleId'
            ]
        });
        attendances.forEach((attendance) => {
            const userId = attendance.attendanceUserId;
            const attendanceDate = (0, moment_1.default)(attendance.attendanceTime).format('YYYY-MM-DD');
            const key = `${userId}-${attendanceDate}`;
            const reportItem = reportData.get(key);
            reportItem.scheduleStartDate = attendance.schedule?.scheduleStartDate;
            reportItem.scheduleStoreId = attendance.schedule?.scheduleStoreId;
            if (reportItem) {
                const attendanceCategory = attendance.attendanceCategory;
                const attendanceTime = attendance.attendanceTime;
                switch (attendanceCategory) {
                    case 'checkin':
                        reportItem.checkinAt = attendanceTime;
                        break;
                    case 'checkout':
                        reportItem.checkoutAt = attendanceTime;
                        break;
                    case 'breakin':
                        reportItem.breakinAt = attendanceTime;
                        break;
                    case 'breakout':
                        reportItem.breakoutAt = attendanceTime;
                        break;
                    case 'otin':
                        reportItem.otinAt = attendanceTime;
                        break;
                    case 'otout':
                        reportItem.otoutAt = attendanceTime;
                        break;
                    default:
                        break;
                }
            }
        });
        const allFormattedData = Array.from(reportData.values());
        const paginatedData = pagination === true
            ? allFormattedData.slice(page.offset, page.offset + page.limit)
            : allFormattedData;
        const response = response_1.ResponseData.success(page.formatData({
            count: allFormattedData.length,
            rows: paginatedData
        }));
        logger_1.default.info('Fetched today attendance report successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllReportByDay = findAllReportByDay;
