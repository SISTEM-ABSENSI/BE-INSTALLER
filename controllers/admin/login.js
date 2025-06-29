"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const user_1 = require("../../models/user");
const scure_password_1 = require("../../utilities/scure_password");
const jwt_1 = require("../../utilities/jwt");
const logger_1 = __importDefault(require("../../utilities/logger"));
const adminSchema_1 = require("../../schemas/adminSchema");
const adminLogin = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(adminSchema_1.adminLoginSchema, req.body);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { userWhatsappNumber, userPassword } = value;
    try {
        const user = await user_1.UserModel.findOne({
            where: {
                deleted: 0,
                userWhatsappNumber
            }
        });
        if (user == null) {
            const message = 'Account not found. Please register first!';
            logger_1.default.info(`Login attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        if (user?.userRole === 'user') {
            const message = 'Gagal Login! Akun tidak terdaftar sebagai admin';
            logger_1.default.info(`Login attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error(message));
        }
        const isPasswordValid = (0, scure_password_1.hashPassword)(userPassword) === user.userPassword;
        if (!isPasswordValid) {
            const message = 'Invalid phone number or password combination!';
            logger_1.default.error(`Login attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error(message));
        }
        const token = (0, jwt_1.generateAccessToken)({ userId: user.userId, userRole: user.userRole });
        logger_1.default.info(`User ${user.userName} logged in successfully`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({ token }));
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.adminLogin = adminLogin;
