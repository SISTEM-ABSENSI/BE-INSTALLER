"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfile = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const logger_1 = __importDefault(require("../../utilities/logger"));
const configs_1 = require("../../configs");
const user_1 = require("../../models/user");
const validateRequest_1 = require("../../utilities/validateRequest");
const myProfileSchema_1 = require("../../schemas/myProfileSchema");
const updateMyProfile = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(myProfileSchema_1.updateMyProfileSchema, req.body);
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const requestBody = value;
    try {
        if ('userName' in requestBody) {
            const userNameChek = await user_1.UserModel.findOne({
                where: {
                    deleted: 0,
                    userName: { [sequelize_1.Op.eq]: requestBody.userName }
                }
            });
            if (userNameChek !== null) {
                const message = 'Username sudah digunakan!';
                logger_1.default.info(`Login attempt failed: ${message}`);
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error(message));
            }
        }
        if ('userPassword' in requestBody) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            requestBody.userPassword = require('crypto')
                .createHash('sha1')
                .update(requestBody.userPassword + configs_1.APP_CONFIGS.secret.passwordEncryption)
                .digest('hex');
        }
        const newData = {
            ...(requestBody?.userName?.length > 0 && {
                userName: requestBody?.userName
            }),
            ...(requestBody?.userPassword?.length > 0 && {
                userPassword: requestBody?.userPassword
            }),
            ...(requestBody?.userRole?.length > 0 && {
                userRole: requestBody?.userRole
            }),
            ...(requestBody?.userWhatsappNumber?.length > 0 && {
                userWhatsappNumber: requestBody?.userWhatsappNumber
            })
        };
        await user_1.UserModel.update(newData, {
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: req.body.jwtPayload.userId }
            }
        });
        const response = response_1.ResponseData.success({ message: 'Schedule updated successfully' });
        logger_1.default.info('Schedule updated successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error.message);
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.updateMyProfile = updateMyProfile;
