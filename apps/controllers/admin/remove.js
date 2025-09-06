"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAdmin = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const user_1 = require("../../models/user");
const validateRequest_1 = require("../../utilities/validateRequest");
const logger_1 = __importDefault(require("../../utilities/logger"));
const adminSchema_1 = require("../../schemas/adminSchema");
const removeAdmin = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(adminSchema_1.removeAdminSchema, req.params);
    if (error != null) {
        const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const { userId } = value;
    try {
        const user = await user_1.UserModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userId: { [sequelize_1.Op.eq]: userId }
            }
        });
        if (user == null) {
            const message = 'User not found!';
            logger_1.default.info(`Attempt to remove non-existing user: ${userId}`);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        user.deleted = 1;
        await user.save();
        logger_1.default.info(`User ${userId} successfully removed`);
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(response_1.ResponseData.success({ message: 'User successfully removed' }));
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.removeAdmin = removeAdmin;
