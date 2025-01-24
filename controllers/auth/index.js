"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const login_1 = require("./login");
const register_1 = require("./register");
exports.authController = {
    login: login_1.userLogin,
    register: register_1.userRegister
};
