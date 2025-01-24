"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTotal = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const user_1 = require("../../models/user");
const storeModel_1 = require("../../models/storeModel");
const logger_1 = __importDefault(require("../../utilities/logger"));
const findTotal = async (req, res) => {
    try {
        const totalUsers = await user_1.UserModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userRole: 'user'
            }
        });
        const totalAdmins = await user_1.UserModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userRole: 'admin'
            }
        });
        const totalSuperAdmins = await user_1.UserModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                userRole: 'superadmin'
            }
        });
        const totalStores = await storeModel_1.StoreModel.count({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 }
            }
        });
        const response = response_1.ResponseData.success({
            totalUsers,
            totalAdmins,
            totalSuperAdmins,
            totalStores
        });
        logger_1.default.info('Store found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.findTotal = findTotal;
