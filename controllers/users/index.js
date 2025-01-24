"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const findAll_1 = require("./findAll");
const findOne_1 = require("./findOne");
exports.userController = {
    findAll: findAll_1.findAllUser,
    findOne: findOne_1.findOneUser
};
