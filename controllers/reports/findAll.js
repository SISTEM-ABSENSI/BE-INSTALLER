"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllReportAttendance = void 0;
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
const findAllReportAttendance = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(attendanceSchema_1.findAllAttendanceSchema, req.query);
    if (error != null) {
        const message = `Invalid query parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { page: queryPage, size: querySize, search, pagination, startDate, endDate } = value;
    try {
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        let startQueryDate = startDate;
        let endQueryDate = endDate;
        if (startDate === undefined || endDate === undefined) {
            endQueryDate = (0, moment_1.default)().format('YYYY-MM-DD');
            startQueryDate = (0, moment_1.default)().subtract(1, 'days').format('YYYY-MM-DD');
        }
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
            const currentDate = (0, moment_1.default)(startQueryDate);
            const lastDate = (0, moment_1.default)(endQueryDate);
            while (currentDate.isSameOrBefore(lastDate, 'day')) {
                const dateKey = currentDate.format('YYYY-MM-DD');
                const key = `${user.userId}-${dateKey}`;
                reportData.set(key, {
                    id: key,
                    userName: user.userName,
                    scheduleStartDate: null,
                    date: dateKey,
                    checkinAt: null,
                    checkoutAt: null,
                    breakinAt: null,
                    breakoutAt: null,
                    otinAt: null,
                    otoutAt: null
                });
                currentDate.add(1, 'day');
            }
        });
        // Step 2: Ambil semua jadwal dalam rentang tanggal
        const schedules = await scheduleModel_1.ScheduleModel.findAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                scheduleUserId: { [sequelize_1.Op.in]: userIds },
                scheduleStartDate: {
                    [sequelize_1.Op.between]: [startQueryDate, endQueryDate]
                }
            },
            attributes: ['scheduleUserId', 'scheduleStartDate']
        });
        // Step 3: Ambil semua kehadiran dalam rentang tanggal
        const attendances = await attendanceModel_1.AttendanceModel.findAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                attendanceUserId: { [sequelize_1.Op.in]: userIds },
                attendanceTime: {
                    // Menggunakan attendanceTime, bukan createdAt
                    [sequelize_1.Op.between]: [`${startQueryDate} 00:00:00`, `${endQueryDate} 23:59:59`]
                }
            },
            attributes: ['attendanceUserId', 'attendanceCategory', 'attendanceTime']
        });
        // Step 4: Gabungkan data jadwal ke dalam laporan
        schedules.forEach((schedule) => {
            const userId = schedule.scheduleUserId;
            // Ambil tanggal saja dari scheduleStartDate
            const scheduleDate = (0, moment_1.default)(schedule.scheduleStartDate).format('YYYY-MM-DD');
            const key = `${userId}-${scheduleDate}`;
            const reportItem = reportData.get(key);
            if (reportItem !== undefined) {
                reportItem.scheduleStartDate = schedule.scheduleStartDate;
            }
        });
        // Step 5: Gabungkan data kehadiran ke dalam laporan
        attendances.forEach((attendance) => {
            const userId = attendance.attendanceUserId;
            const attendanceDate = (0, moment_1.default)(attendance.attendanceTime).format('YYYY-MM-DD');
            const key = `${userId}-${attendanceDate}`;
            const reportItem = reportData.get(key);
            if (reportItem !== undefined) {
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
        // Step 6: Konversi Map menjadi array dan terapkan pagination
        const allFormattedData = Array.from(reportData.values());
        const paginatedData = pagination === true
            ? allFormattedData.slice(page.offset, page.offset + page.limit)
            : allFormattedData;
        const response = response_1.ResponseData.success(page.formatData({
            count: allFormattedData.length,
            rows: paginatedData
        }));
        logger_1.default.info('Fetched and formatted attendance report successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllReportAttendance = findAllReportAttendance;
