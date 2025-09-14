"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appChekController = void 0;
const appSetting_1 = require("./appSetting");
const healthChek_1 = require("./healthChek");
const main_1 = require("./main");
exports.appChekController = {
    healthCheck: healthChek_1.healthCheck,
    appSetting: appSetting_1.appSetting,
    mainApp: main_1.mainApp
};
