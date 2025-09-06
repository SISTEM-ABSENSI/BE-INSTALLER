"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetDeviceControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findByDeviceId_1 = require("./findByDeviceId");
const findDetail_1 = require("./findDetail");
const update_1 = require("./update");
exports.resetDeviceControllers = {
    findAll: findAll_1.findAllResetDecice,
    findDetail: findDetail_1.findDetailResetDeviceId,
    findByDeviceId: findByDeviceId_1.findDetailResetDeviceByDeviceId,
    create: create_1.createResetDevice,
    update: update_1.updateResetDevice
};
