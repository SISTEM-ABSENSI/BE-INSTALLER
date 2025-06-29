"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const login_1 = require("./login");
const register_1 = require("./register");
const updatePassword_1 = require("./updatePassword");
exports.authController = {
    login: login_1.userLogin,
    register: register_1.userRegister,
    updatePassword: updatePassword_1.updatePassword
};
