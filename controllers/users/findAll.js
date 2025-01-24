"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const user_1 = require("../../models/user");
const pagination_1 = require("../../utilities/pagination");
const user_2 = require("../../schemas/user");
const logger_1 = __importDefault(require("../../utilities/logger"));
const findAllUser = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(user_2.findAllUsersSchema, req.query);
    if (error != null) {
        const message = `Invalid query parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { page: queryPage, size: querySize, search, pagination } = value;
    try {
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        const users = await user_1.UserModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.not]: req.body?.jwtPayload?.userId },
                userRole: 'user',
                ...(Boolean(search) && {
                    [sequelize_1.Op.or]: [{ userName: { [sequelize_1.Op.like]: `%${search}%` } }]
                })
            },
            attributes: [
                'userId',
                'userDeviceId',
                'userName',
                'userContact',
                'userRole',
                'createdAt',
                'updatedAt'
            ],
            order: [['userId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success(page.formatData(users));
        logger_1.default.info('Fetched all users successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllUser = findAllUser;
