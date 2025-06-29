"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllScheduleSwap = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const sequelize_1 = require("sequelize");
const scheduleSwapSchema_1 = require("../../schemas/scheduleSwapSchema");
const scheduleSwapModel_1 = require("../../models/scheduleSwapModel");
const scheduleModel_1 = require("../../models/scheduleModel");
const user_1 = require("../../models/user");
const storeModel_1 = require("../../models/storeModel");
const findAllScheduleSwap = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(scheduleSwapSchema_1.findAllScheduleSwapSchema, req.query);
    if (error != null) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { page: queryPage, size: querySize, pagination, scheduleSwapStatus, scheduleSwapCategory } = value;
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        const result = await scheduleSwapModel_1.ScheduleSwapModel.findAndCountAll({
            where: {
                deleted: 0,
                ...(Boolean(scheduleSwapCategory === 'request') && {
                    scheduleSwapRequestUserId: req.body?.jwtPayload?.userId
                }),
                ...(Boolean(scheduleSwapCategory === 'reciver') && {
                    scheduleSwapReciverUserId: req.body?.jwtPayload?.userId
                }),
                ...(Boolean(scheduleSwapStatus) && {
                    scheduleSwapStatus: scheduleSwapStatus
                })
            },
            include: [
                {
                    model: scheduleModel_1.ScheduleModel,
                    as: 'schedule',
                    include: [
                        {
                            model: user_1.UserModel,
                            as: 'user',
                            attributes: ['userName', 'userWhatsappNumber']
                        },
                        {
                            model: storeModel_1.StoreModel,
                            as: 'store',
                            attributes: ['storeName', 'storeAddress']
                        }
                    ]
                }
            ],
            order: [
                [
                    (0, sequelize_1.fn)('FIELD', (0, sequelize_1.col)('scheduleSwapStatus'), 'pending', 'accepted', 'rejected', 'cancelled'),
                    'ASC'
                ],
                ['scheduleSwapId', 'desc']
            ],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success(result);
        response.data = page.formatData(result);
        logger_1.default.info('Schedule Swap retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllScheduleSwap = findAllScheduleSwap;
