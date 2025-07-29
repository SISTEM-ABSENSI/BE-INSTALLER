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
const findAttendanceReport = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(findAttendanceReportSchema, req.query);
    if (error != null) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { date, page: queryPage, size: querySize, pagination } = value;
        const page = new pagination_1.Pagination(pagination ? parseInt(queryPage) || 0 : 0, pagination ? parseInt(querySize) || 10 : undefined);
        const result = await user_1.UserModel.findAndCountAll({
            attributes: ['userName', 'userWhatsappNumber'],
            include: [
                {
                    model: scheduleModel_1.ScheduleModel,
                    as: 'schedule',
                    required: false,
                    attributes: [
                        [
                            sequelize_1.Sequelize.fn('DATE_FORMAT', sequelize_1.Sequelize.col('scheduleStartDate'), '%d/%m/%Y %H:%i:%s'),
                            'scheduleStartDate'
                        ],
                        [
                            sequelize_1.Sequelize.fn('DATE_FORMAT', sequelize_1.Sequelize.col('scheduleEndDate'), '%d/%m/%Y %H:%i:%s'),
                            'scheduleEndDate'
                        ]
                    ],
                    where: {
                        deleted: 0,
                        ...(date && {
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
                        })
                    }
                },
                {
                    model: attendanceModel_1.AttendanceModel,
                    as: 'attendance',
                    required: false,
                    attributes: [
                        [
                            sequelize_1.Sequelize.fn('DATE_FORMAT', sequelize_1.Sequelize.col('attendanceTime'), '%d/%m/%Y %H:%i:%s'),
                            'attendanceTime'
                        ],
                        [
                            sequelize_1.Sequelize.fn('ROUND', sequelize_1.Sequelize.col('attendanceDistanceFromStore'), 2),
                            'attendanceDistanceFromStore'
                        ],
                        'attendanceCategory'
                    ],
                    where: {
                        deleted: 0,
                        ...(date && {
                            attendanceTime: {
                                [sequelize_1.Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`]
                            }
                        })
                    }
                }
            ],
            order: [
                ['userName', 'ASC'],
                [{ model: attendanceModel_1.AttendanceModel, as: 'attendance' }, 'attendanceTime', 'ASC']
            ],
            distinct: true,
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const formattedResult = result.rows.map((user) => ({
            Nama: user.userName,
            No_HP: user.userWhatsappNumber,
            Jam_Masuk_Jadwal: user.schedule ? user.schedule.get('scheduleStartDate') : null,
            Jam_Pulang_Jadwal: user.schedule ? user.schedule.get('scheduleEndDate') : null,
            Absen: user.attendance ? user.attendance.get('attendanceTime') : null,
            Jarak: user.attendance ? user.attendance.get('attendanceDistanceFromStore') : null,
            Keterangan: user.attendance ? user.attendance.attendanceCategory : null
        }));
        const response = response_1.ResponseData.success({ count: result.count, rows: formattedResult });
        response.data = page.formatData({ count: result.count, rows: formattedResult });
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
