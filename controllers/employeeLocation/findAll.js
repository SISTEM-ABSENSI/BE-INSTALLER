"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllEmployeeLocation = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const user_1 = require("../../models/user");
const employeeSchema_1 = require("../../schemas/employeeSchema");
const employeeLocation_1 = require("../../models/employeeLocation");
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const findAllEmployeeLocation = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(employeeSchema_1.findAllEmployeeLocationSchema, req.query);
    if (error != null) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { page: queryPage, size: querySize, pagination } = value;
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        const today = (0, moment_1.default)().format('YYYY-MM-DD');
        const todayStart = `${today} 00:00:00`;
        const todayEnd = `${today} 23:59:59`;
        const result = await employeeLocation_1.EmployeeLocationModel.findAndCountAll({
            where: {
                deleted: 0,
                createdAt: {
                    [sequelize_1.Op.between]: [todayStart, todayEnd]
                }
            },
            include: [
                {
                    model: user_1.UserModel,
                    as: 'user',
                    attributes: ['userId', 'userName']
                }
            ],
            order: [['employeeLocationId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success(result);
        response.data = page.formatData(result);
        logger_1.default.info('Employee location retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllEmployeeLocation = findAllEmployeeLocation;
