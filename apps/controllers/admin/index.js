"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const login_1 = require("./login");
const register_1 = require("./register");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.adminController = {
    findAll: findAll_1.findAllAdmin,
    findOne: findDetail_1.findDetailAdmin,
    remove: remove_1.removeAdmin,
    update: update_1.updateAdmin,
    login: login_1.adminLogin,
    register: register_1.adminRegister
};
