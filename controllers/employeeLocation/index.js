"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeLocationController = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
exports.employeeLocationController = {
    findAll: findAll_1.findAllEmployeeLocation,
    create: create_1.createEmployeeLocation
};
