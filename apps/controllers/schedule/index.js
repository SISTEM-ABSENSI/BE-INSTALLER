"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.scheduleControllers = {
    findAll: findAll_1.findAllSchedule,
    findOne: findDetail_1.findDetailSchedule,
    create: create_1.createSchedule,
    update: update_1.updateSchedule,
    remove: remove_1.removeSchedule
};
