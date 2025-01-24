"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSpg = exports.update = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const user_1 = require("../../models/user");
const validateRequest_1 = require("../../utilities/validateRequest");
const user_2 = require("../../schemas/user");
const scure_password_1 = require("../../utilities/scure_password");
const logger_1 = __importDefault(require("../../utilities/logger"));
const update = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(user_2.updateUserSchema, req.body);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { userId, userName, userContact, userDeviceId, userPassword, userRole } = value;
    try {
        const user = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: userId }
            }
        });
        if (user == null) {
            const message = 'User not found!';
            logger_1.default.info(`Attempt to update non-existing user: ${userId}`);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const updatedData = {
            ...(userName?.length > 0 && { userName }),
            ...(userContact?.length > 0 && { userContact }),
            ...(userDeviceId?.length > 0 && { userDeviceId }),
            ...(userPassword?.length > 0 && { userPassword: (0, scure_password_1.hashPassword)(userPassword) }),
            ...(userRole?.length > 0 && { userRole })
        };
        await user_1.UserModel.update(updatedData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: userId }
            }
        });
        logger_1.default.info(`User ${userId} updated successfully`);
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_1.ResponseData.success({ message: 'User updated successfully' }));
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.update = update;
const updateUserSpg = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(user_2.updateUserSchema, req.body);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { userId, userName, userContact, userDeviceId, userPassword, userRole } = value;
    console.log(req.body);
    try {
        const user = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: req.body?.jwtPayload?.userId }
            }
        });
        if (user == null) {
            const message = 'User not found!';
            logger_1.default.info(`Attempt to update non-existing user: ${userId}`);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const updatedData = {
            ...(userName?.length > 0 && { userName }),
            ...(userContact?.length > 0 && { userContact }),
            ...(userDeviceId?.length > 0 && { userDeviceId }),
            ...(userPassword?.length > 0 && { userPassword: (0, scure_password_1.hashPassword)(userPassword) }),
            ...(userRole?.length > 0 && { userRole })
        };
        await user_1.UserModel.update(updatedData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: req.body?.jwtPayload?.userId }
            }
        });
        logger_1.default.info(`User ${userId} updated successfully`);
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_1.ResponseData.success({ message: 'User updated successfully' }));
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.updateUserSpg = updateUserSpg;
