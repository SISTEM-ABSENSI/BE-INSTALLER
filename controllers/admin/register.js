"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRegister = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const user_1 = require("../../models/user");
const scure_password_1 = require("../../utilities/scure_password");
const logger_1 = __importDefault(require("../../utilities/logger"));
const adminSchema_1 = require("../../schemas/adminSchema");
const adminRegister = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(adminSchema_1.adminRegistrationSchema, req.body);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { userName, userPassword, userWhatsappNumber, userDeviceId, userRole } = value;
    try {
        const existingUser = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userWhatsappNumber: { [sequelize_1.Op.eq]: userWhatsappNumber }
            }
        });
        if (existingUser != null) {
            const message = `Nomor Whatsapp ${existingUser.userWhatsappNumber} sudah terdaftar, gunakan yang lain`;
            logger_1.default.info(`Registration attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
        }
        if (userRole === 'user') {
            const existingDevice = await user_1.UserModel.findOne({
                raw: true,
                where: {
                    deleted: { [sequelize_1.Op.eq]: 0 },
                    userDeviceId: { [sequelize_1.Op.eq]: userDeviceId }
                }
            });
            if (existingDevice !== null) {
                const message = 'Device sudah terdaftar! gunakan device yang lain';
                logger_1.default.info(`Login attempt failed: ${message}`);
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error(message));
            }
        }
        const hashedPassword = (0, scure_password_1.hashPassword)(userPassword);
        const newUser = {
            ...value,
            userPassword: hashedPassword
        };
        await user_1.UserModel.create(newUser);
        logger_1.default.info(`User ${userName} registered successfully`);
        return res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json(response_1.ResponseData.success({ message: 'Registration successful' }));
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.adminRegister = adminRegister;
