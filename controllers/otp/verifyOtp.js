"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const redis_1 = __importDefault(require("../../configs/redis"));
const otpSchema_1 = require("../../schemas/otpSchema");
const verifyOtp = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(otpSchema_1.verifyOtpSchema, req.body);
    if (error != null) {
        const message = `Invalid request body! ${error.details
            .map((x) => x.message)
            .join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const storedOtp = await redis_1.default.get(`otp:${req.body.otpCode}`);
        if (!storedOtp || storedOtp !== req.body.otpCode) {
            const message = 'Invalid or expired OTP!';
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error(message));
        }
        await redis_1.default.del(`otp:${req.body.otpCode}`);
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
exports.verifyOtp = verifyOtp;
