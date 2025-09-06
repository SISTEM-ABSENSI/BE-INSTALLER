"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appChekController = void 0;
const healthChek_1 = require("./healthChek");
const main_1 = require("./main");
exports.appChekController = {
    healthCheck: healthChek_1.healthCheck,
    mainApp: main_1.mainApp
};
