"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchedule = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const logger_1 = __importDefault(require("../../utilities/logger"));
const scheduleModel_1 = require("../../models/scheduleModel");
const scheduleSchema_1 = require("../../schemas/scheduleSchema");
const index_1 = require("../../models/index");
const createSchedule = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(scheduleSchema_1.createScheduleSchema, req.body);
    if (error != null) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    const transaction = await index_1.sequelize.transaction();
    try {
        value.scheduleUserId = req.body?.jwtPayload?.userId;
        const schedule = await scheduleModel_1.ScheduleModel.create(value, { transaction });
        // const todoLists = req.body.todoLists.map((todo: any) => ({
        //   ...todo,
        //   todoListScheduleId: schedule.scheduleId
        // }))
        // await TodoListModel.bulkCreate(todoLists, { transaction })
        await transaction.commit();
        const response = response_1.ResponseData.success();
        logger_1.default.info('Schedule and todo lists created successfully');
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        await transaction.rollback();
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.createSchedule = createSchedule;
