"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestOtp = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const axios_1 = __importDefault(require("axios"));
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const user_1 = require("../../models/user");
const redis_1 = __importDefault(require("../../configs/redis"));
const otpSchema_1 = require("../../schemas/otpSchema");
const configs_1 = require("../../configs");
const requestOtp = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(otpSchema_1.requestOtpSchema, req.body);
    if (error != null) {
        const message = `Invalid request body! ${error.details
            .map((x) => x.message)
            .join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const requestBody = value;
    try {
        const existingUser = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userWhatsappNumber: { [sequelize_1.Op.eq]: requestBody.whatsappNumber }
            }
        });
        if (requestBody.otpType === 'reset' && existingUser === null) {
            const message = `whatsapp number ${requestBody.whatsappNumber} is not registered.`;
            logger_1.default.info(`Registration attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
        }
        if (requestBody.otpType === 'register' && existingUser !== null) {
            const message = `whatsapp number ${requestBody.whatsappNumber} is already registered.`;
            logger_1.default.info(`Registration attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const minutes = 5;
        await redis_1.default.setex(`otp:${otpCode}`, minutes * 60, otpCode);
        const message = encodeURIComponent(`*${otpCode}* adalah kode verifikasi Anda.\n\n` +
            `Pengingat keamanan: Untuk memastikan keamanan akun Anda, mohon jangan bagikan informasi apa pun tentang akun Anda kepada siapa pun. kode ini akan expire dalam ${minutes} menit`);
        try {
            await axios_1.default.get(`${configs_1.APP_CONFIGS.wablas.url}/send-message?phone=${requestBody.whatsappNumber}&message=${message}&token=${configs_1.APP_CONFIGS.wablas.token}`);
        }
        catch (e) {
            logger_1.default.error(e);
            throw e;
        }
        const response = response_1.ResponseData.success();
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        logger_1.default.error(message);
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.requestOtp = requestOtp;
