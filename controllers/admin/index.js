"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const findAll_1 = require("./findAll");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.adminController = {
    findAll: findAll_1.findAll,
    findOne: findAll_1.findOne,
    remove: remove_1.remove,
    update: update_1.update
};
