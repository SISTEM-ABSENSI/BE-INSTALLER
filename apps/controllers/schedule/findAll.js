"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllSchedule = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const scheduleSchema_1 = require("../../schemas/scheduleSchema");
const scheduleModel_1 = require("../../models/scheduleModel");
const storeModel_1 = require("../../models/storeModel");
const sequelize_1 = require("sequelize");
const user_1 = require("../../models/user");
const findAllSchedule = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(scheduleSchema_1.findAllScheduleSchema, req.query);
    if (error != null) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { page: queryPage, size: querySize, pagination, search, scheduleStatus, scheduleStatusNot, startDate, endDate } = value;
        const page = new pagination_1.Pagination(pagination ? parseInt(queryPage) || 0 : 0, pagination ? parseInt(querySize) || 10 : undefined);
        console.log(value);
        const result = await scheduleModel_1.ScheduleModel.findAndCountAll({
            where: {
                deleted: 0,
                ...(Boolean(req.body?.jwtPayload?.userRole === 'user') && {
                    scheduleUserId: req.body?.jwtPayload?.userId
                }),
                ...(Boolean(scheduleStatus) &&
                    scheduleStatus !== 'all' && {
                    scheduleStatus: scheduleStatus
                }),
                ...(Boolean(scheduleStatusNot) && {
                    scheduleStatus: {
                        [sequelize_1.Op.not]: scheduleStatusNot
                    }
                }),
                ...(Boolean(startDate) &&
                    Boolean(endDate) && {
                    [sequelize_1.Op.or]: [
                        {
                            scheduleStartDate: {
                                [sequelize_1.Op.between]: [startDate + ' 00:00:00', endDate + ' 23:59:59']
                            }
                        },
                        {
                            scheduleEndDate: {
                                [sequelize_1.Op.between]: [startDate + ' 00:00:00', endDate + ' 23:59:59']
                            }
                        }
                    ]
                }),
                ...(Boolean(startDate) &&
                    !endDate && {
                    scheduleStartDate: {
                        [sequelize_1.Op.gte]: startDate + ' 00:00:00'
                    }
                }),
                ...(Boolean(endDate) &&
                    !startDate && {
                    scheduleStartDate: {
                        [sequelize_1.Op.lte]: endDate + ' 23:59:59'
                    }
                })
            },
            include: [
                {
                    model: storeModel_1.StoreModel,
                    as: 'store'
                },
                {
                    model: user_1.UserModel,
                    where: {
                        ...(Boolean(search) && {
                            [sequelize_1.Op.or]: [{ userName: { [sequelize_1.Op.like]: `%${search}%` } }]
                        })
                    },
                    as: 'user'
                }
            ],
            order: [
                [(0, sequelize_1.fn)('FIELD', (0, sequelize_1.col)('scheduleStatus'), 'progress', 'waiting', 'done'), 'ASC'],
                ['scheduleId', 'desc']
            ],
            distinct: true,
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success(result);
        response.data = page.formatData(result);
        logger_1.default.info('Schedule retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllSchedule = findAllSchedule;
