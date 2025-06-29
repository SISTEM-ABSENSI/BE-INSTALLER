"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productivities = void 0;
const moment_1 = __importDefault(require("moment"));
const attendanceModel_1 = require("../../models/attendanceModel");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../utilities/logger"));
const response_1 = require("../../utilities/response");
const statisticSchema_1 = require("../../schemas/statisticSchema");
const validateRequest_1 = require("../../utilities/validateRequest");
const productivities = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(statisticSchema_1.findProductivitiesSchema, req.query);
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        // Ambil semua data attendance sesuai role/filter
        const attendances = await attendanceModel_1.AttendanceModel.findAll({
            where: {
                ...(Boolean(req.body?.jwtPayload?.userRole === 'user') && {
                    attendanceUserId: req.body?.jwtPayload?.userId
                }),
                ...(Boolean(value.attendanceScheduleId) && {
                    attendanceScheduleId: value.attendanceScheduleId
                }),
                ...(Boolean(value.attendanceUserId) && {
                    attendanceUserId: value.attendanceUserId
                })
            },
            order: [['attendanceTime', 'ASC']]
        });
        let filteredByTime = [...attendances];
        // Filter berdasarkan attendanceTimeRange
        if (value.attendanceTimeRange) {
            const now = (0, moment_1.default)();
            filteredByTime = attendances.filter((record) => {
                const date = (0, moment_1.default)(record.attendanceTime);
                switch (value.attendanceTimeRange) {
                    case 'today':
                        return date.isSame(now, 'day');
                    case 'thisWeek':
                        return date.isSame(now, 'week');
                    case 'thisMonth':
                        return date.isSame(now, 'month');
                    case 'thisYear':
                        return date.isSame(now, 'year');
                    default:
                        return true;
                }
            });
        }
        // Group by date
        const groupedByDate = {};
        filteredByTime.forEach((record) => {
            const date = (0, moment_1.default)(record.attendanceTime).format('YYYY-MM-DD');
            if (!groupedByDate[date])
                groupedByDate[date] = [];
            groupedByDate[date].push(record);
        });
        let totalWorkMs = 0;
        let totalBreakMs = 0;
        let totalOvertimeMs = 0;
        for (const date in groupedByDate) {
            const dayRecords = groupedByDate[date];
            const checkins = dayRecords.filter((r) => r.attendanceCategory === 'checkin');
            const checkouts = dayRecords.filter((r) => r.attendanceCategory === 'checkout');
            const breakins = dayRecords.filter((r) => r.attendanceCategory === 'breakin');
            const breakouts = dayRecords.filter((r) => r.attendanceCategory === 'breakout');
            const otins = dayRecords.filter((r) => r.attendanceCategory === 'otin');
            const otouts = dayRecords.filter((r) => r.attendanceCategory === 'otout');
            // Work Time
            if (checkins.length && checkouts.length) {
                const workStart = (0, moment_1.default)(checkins[0].attendanceTime);
                const workEnd = (0, moment_1.default)(checkouts[checkouts.length - 1].attendanceTime);
                if (workEnd.isAfter(workStart)) {
                    let workDuration = workEnd.diff(workStart, 'milliseconds');
                    // Subtract breaks
                    breakins.forEach((breakin, i) => {
                        const breakout = breakouts[i];
                        if (breakout) {
                            const start = (0, moment_1.default)(breakin.attendanceTime);
                            const end = (0, moment_1.default)(breakout.attendanceTime);
                            if (end.isAfter(start)) {
                                const duration = end.diff(start, 'milliseconds');
                                workDuration -= duration;
                                totalBreakMs += duration;
                            }
                        }
                    });
                    if (workDuration > 0) {
                        totalWorkMs += workDuration;
                    }
                }
            }
            // Overtime
            otins.forEach((otin, i) => {
                const otout = otouts[i];
                if (otout) {
                    const start = (0, moment_1.default)(otin.attendanceTime);
                    const end = (0, moment_1.default)(otout.attendanceTime);
                    if (end.isAfter(start)) {
                        const duration = end.diff(start, 'milliseconds');
                        totalOvertimeMs += duration;
                    }
                }
            });
        }
        // const result = {
        //   totalWorkTime: moment.utc(totalWorkMs).format('HH:mm:ss'),
        //   totalBreakTime: moment.utc(totalBreakMs).format('HH:mm:ss'),
        //   totalOvertime: moment.utc(totalOvertimeMs).format('HH:mm:ss')
        // }
        const convertMsToDecimalHours = (milliseconds) => {
            return parseFloat((milliseconds / (1000 * 60 * 60)).toFixed(2));
        };
        const result = {
            totalWorkTimeInHour: convertMsToDecimalHours(totalWorkMs),
            totalBreakTimeInHour: convertMsToDecimalHours(totalBreakMs),
            totalOverTimeInHour: convertMsToDecimalHours(totalOvertimeMs)
        };
        const response = response_1.ResponseData.success(result);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.productivities = productivities;
