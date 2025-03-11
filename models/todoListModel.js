"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
exports.TodoListModel = index_1.sequelize.define('TodoLists', {
    ...zygote_1.ZygoteModel,
    todoListId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    todoListName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    todoListScheduleId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    todoListStatus: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    tableName: 'todo_lists',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});
