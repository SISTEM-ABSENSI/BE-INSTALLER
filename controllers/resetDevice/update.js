"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateResetDevice = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const resetDeciceSchema_1 = require("../../schemas/resetDeciceSchema");
const resetDeviceModel_1 = require("../../models/resetDeviceModel");
const user_1 = require("../../models/user");
const updateResetDevice = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(resetDeciceSchema_1.updateResetDeviceSchema, {
        ...req.body
    });
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const requestBody = value;
        const resetDevice = await resetDeviceModel_1.ResetDeviceModel.findOne({
            where: { deleted: 0, resetDeviceId: value.resetDeviceId }
        });
        if (resetDevice === null) {
            const message = `reset device not found`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        if (requestBody.resetDeviceStatus === 'accepted') {
            const user = await user_1.UserModel.findOne({
                where: {
                    deleted: 0,
                    userId: resetDevice.resetDeviceUserId
                }
            });
            if (user) {
                user.userDeviceId = resetDevice.resetDeviceDeviceId;
                void user.save();
            }
        }
        resetDevice.resetDeviceStatus = requestBody.resetDeviceStatus;
        void resetDevice.save();
        const response = response_1.ResponseData.success();
        logger_1.default.info('resetdevice updated successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.updateResetDevice = updateResetDevice;
