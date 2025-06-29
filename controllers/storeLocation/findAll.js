"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllStoreLocation = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const storeModel_1 = require("../../models/storeModel");
const storeLocationSchema_1 = require("../../schemas/storeLocationSchema");
const findAllStoreLocation = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(storeLocationSchema_1.findAllStoreLocationSchema, req.query);
    if (error != null) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { page: queryPage, size: querySize, pagination } = value;
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        const result = await storeModel_1.StoreModel.findAndCountAll({
            where: {
                deleted: 0
            },
            attributes: [
                'storeId',
                'storeName',
                'storeAddress',
                'storeLongitude',
                'storeLatitude'
            ],
            order: [['storeId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success(result);
        response.data = page.formatData(result);
        logger_1.default.info('Store retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllStoreLocation = findAllStoreLocation;
// import { type Response } from 'express'
// import { StatusCodes } from 'http-status-codes'
// import { validateRequest } from '../../utilities/validateRequest'
// import { ResponseData } from '../../utilities/response'
// import logger from '../../utilities/logger'
// import { Pagination } from '../../utilities/pagination'
// import { findAllScheduleSchema } from '../../schemas/scheduleSchema'
// import { ScheduleModel } from '../../models/scheduleModel'
// import { StoreModel } from '../../models/storeModel'
// import { Op } from 'sequelize'
// import { UserModel } from '../../models/user'
// export const findAllStoreLocation = async (
//   req: any,
//   res: Response
// ): Promise<Response> => {
//   const { error, value } = validateRequest(findAllScheduleSchema, req.query)
//   if (error != null) {
//     const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`
//     logger.warn(message)
//     return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
//   }
//   try {
//     const { page: queryPage, size: querySize, pagination } = value
//     const page = new Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10)
//     const result = await ScheduleModel.findAndCountAll({
//       where: {
//         deleted: 0,
//         [Op.or]: [{ scheduleStatus: 'checkin' }, { scheduleStatus: 'checkout' }]
//       },
//       include: [
//         {
//           model: StoreModel,
//           as: 'store',
//           attributes: [
//             'storeId',
//             'storeName',
//             'storeAddress',
//             'storeLongitude',
//             'storeLatitude'
//           ]
//         },
//         {
//           model: UserModel,
//           as: 'user'
//         }
//       ],
//       attributes: ['scheduleStatus'],
//       order: [['scheduleId', 'desc']],
//       ...(pagination === 'true' && {
//         limit: page.limit,
//         offset: page.offset
//       })
//     })
//     const response = ResponseData.success(result)
//     response.data = page.formatData(result)
//     logger.info('Schedule retrieved successfully')
//     return res.status(StatusCodes.OK).json(response)
//   } catch (error: any) {
//     const message = `Unable to process request! Error: ${error.message}`
//     logger.error(message, { stack: error.stack })
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
//   }
// }
