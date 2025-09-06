"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailEmployee = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const user_1 = require("../../models/user");
const logger_1 = __importDefault(require("../../utilities/logger"));
const employeeSchema_1 = require("../../schemas/employeeSchema");
const findDetailEmployee = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(employeeSchema_1.findDetailEmployeeSchema, req.params);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { employeeId } = value;
    try {
        const user = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: employeeId },
                userRole: 'user'
            },
            attributes: [
                'userId',
                'userName',
                'userDeviceId',
                'userWhatsappNumber',
                'createdAt',
                'updatedAt'
            ]
        });
        if (user == null) {
            const message = 'User not found!';
            logger_1.default.info(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const response = response_1.ResponseData.success(user);
        logger_1.default.info(`Fetched user with ID: ${employeeId} successfully`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findDetailEmployee = findDetailEmployee;
