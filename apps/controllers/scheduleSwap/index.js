"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleSwapControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findOne_1 = require("./findOne");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.scheduleSwapControllers = {
    findAll: findAll_1.findAllScheduleSwap,
    findOne: findOne_1.findOneScheduleSwap,
    create: create_1.createScheduleSwap,
    update: update_1.updateScheduleSwap,
    remove: remove_1.removeScheduleSwap
};
