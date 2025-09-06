"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAttendanceReport = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const sequelize_1 = require("sequelize");
const scheduleModel_1 = require("../../models/scheduleModel");
const user_1 = require("../../models/user");
const attendanceModel_1 = require("../../models/attendanceModel");
const attendanceSchema_1 = require("../../schemas/attendanceSchema");
// Helper function to generate date range
const generateDateRange = (startDate, endDate) => {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        dates.push(dt.toISOString().split('T')[0]);
    }
    return dates;
};
const findAttendanceReport = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(attendanceSchema_1.findAttendanceReportSchema, req.query);
    if (error != null) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { startDate, endDate, page: queryPage, size: querySize, pagination } = value;
        const page = new pagination_1.Pagination(pagination ? parseInt(queryPage) || 0 : 0, pagination ? parseInt(querySize) || 10 : undefined);
        // Fetch all users, sorted by userName (A to Z)
        const users = await user_1.UserModel.findAll({
            attributes: ['userId', 'userName', 'userWhatsappNumber'],
            where: { deleted: 0, userRole: 'user' },
            order: [['userName', 'ASC']]
        });
        // Generate date range or use current date if none provided
        const dates = startDate && endDate
            ? generateDateRange(startDate, endDate)
            : [new Date().toISOString().split('T')[0]];
        const formattedResult = [];
        let totalCount = 0;
        // Define all possible attendance categories
        const attendanceCategories = [
            'checkin',
            'breakin',
            'breakout',
            'otin',
            'otout',
            'checkout'
        ];
        // Iterate through each user and date
        for (const user of users) {
            for (const date of dates) {
                // Fetch schedule for the user on the specific date
                const schedule = await scheduleModel_1.ScheduleModel.findOne({
                    attributes: [
                        [
                            sequelize_1.Sequelize.fn('DATE_FORMAT', sequelize_1.Sequelize.col('schedule_start_date'), '%d/%m/%Y %H:%i:%s'),
                            'scheduleStartDate'
                        ],
                        [
                            sequelize_1.Sequelize.fn('DATE_FORMAT', sequelize_1.Sequelize.col('schedule_end_date'), '%d/%m/%Y %H:%i:%s'),
                            'scheduleEndDate'
                        ]
                    ],
                    where: {
                        deleted: 0,
                        scheduleUserId: user.userId,
                        [sequelize_1.Op.or]: [
                            {
                                scheduleStartDate: {
                                    [sequelize_1.Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`]
                                }
                            },
                            {
                                scheduleEndDate: {
                                    [sequelize_1.Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`]
                                }
                            }
                        ]
                    }
                });
                // Fetch all attendance records for the user on the specific date
                const attendances = await attendanceModel_1.AttendanceModel.findAll({
                    attributes: [
                        [
                            sequelize_1.Sequelize.fn('DATE_FORMAT', sequelize_1.Sequelize.col('attendance_time'), '%d/%m/%Y %H:%i:%s'),
                            'attendanceTime'
                        ],
                        [
                            sequelize_1.Sequelize.fn('ROUND', sequelize_1.Sequelize.col('attendance_distance_from_store'), 2),
                            'attendanceDistanceFromStore'
                        ],
                        'attendanceCategory'
                    ],
                    where: {
                        deleted: 0,
                        attendanceUserId: user.userId,
                        attendanceTime: {
                            [sequelize_1.Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`]
                        }
                    },
                    order: [['attendance_time', 'ASC']]
                });
                // Create a map of attendance records by category
                const attendanceMap = new Map(attendances.map((att) => [att.attendanceCategory, att]));
                // Generate a row for each possible attendance category
                for (const category of attendanceCategories) {
                    const attendance = attendanceMap.get(category);
                    formattedResult.push({
                        Nama: user.userName,
                        No_HP: user.userWhatsappNumber,
                        Tanggal: date,
                        Jam_Masuk_Jadwal: schedule ? schedule.get('scheduleStartDate') : null,
                        Jam_Pulang_Jadwal: schedule ? schedule.get('scheduleEndDate') : null,
                        Absen: attendance ? attendance.get('attendanceTime') : null,
                        Jarak: attendance ? attendance.get('attendanceDistanceFromStore') : null,
                        Keterangan: attendance ? attendance.attendanceCategory : category
                    });
                    totalCount++;
                }
            }
        }
        // Apply pagination
        const paginatedResult = pagination
            ? formattedResult.slice(page.offset, page.offset + page.limit)
            : formattedResult;
        const response = response_1.ResponseData.success({ count: totalCount, rows: paginatedResult });
        response.data = page.formatData({ count: totalCount, rows: paginatedResult });
        logger_1.default.info('Attendance report retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAttendanceReport = findAttendanceReport;
