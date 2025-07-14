"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findAllStoreName_1 = require("./findAllStoreName");
const findOne_1 = require("./findOne");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.storeControllers = {
    findAll: findAll_1.findAllStore,
    findAllStoreName: findAllStoreName_1.findAllStoreName,
    findOne: findOne_1.findOneStore,
    create: create_1.createStore,
    update: update_1.updateStore,
    remove: remove_1.removeStore
};
