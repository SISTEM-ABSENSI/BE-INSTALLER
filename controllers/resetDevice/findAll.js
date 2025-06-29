"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllResetDecice = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const resetDeciceSchema_1 = require("../../schemas/resetDeciceSchema");
const resetDeviceModel_1 = require("../../models/resetDeviceModel");
const user_1 = require("../../models/user");
const sequelize_1 = require("sequelize");
const findAllResetDecice = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(resetDeciceSchema_1.findAllResetDeviceSchema, req.query);
    if (error != null) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { page: queryPage, size: querySize, pagination, search } = value;
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        console.log(value);
        const result = await resetDeviceModel_1.ResetDeviceModel.findAndCountAll({
            where: {
                ...(Boolean(value.deviceId) && {
                    resetDeviceDeviceId: value.deviceId
                })
            },
            include: [
                {
                    model: user_1.UserModel,
                    as: 'user',
                    where: {
                        ...(Boolean(search) && {
                            [sequelize_1.Op.or]: [{ userName: { [sequelize_1.Op.like]: `%${search}%` } }]
                        })
                    }
                }
            ],
            order: [['resetDeviceId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success(result);
        response.data = page.formatData(result);
        logger_1.default.info('Reset device retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllResetDecice = findAllResetDecice;
