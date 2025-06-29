"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleSwapModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
const scheduleModel_1 = require("./scheduleModel");
exports.ScheduleSwapModel = index_1.sequelize.define('ScheduleSwaps', {
    ...zygote_1.ZygoteModel,
    scheduleSwapId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    scheduleSwapRequestUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    scheduleSwapReciverUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    scheduleSwapScheduleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    scheduleSwapStatus: {
        type: sequelize_1.DataTypes.ENUM('pending', 'accepted', 'rejected', 'cancelled'),
        allowNull: true,
        defaultValue: 'pending'
    }
}, {
    tableName: 'schedule_swaps',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});
exports.ScheduleSwapModel.belongsTo(scheduleModel_1.ScheduleModel, {
    foreignKey: 'scheduleSwapScheduleId',
    as: 'schedule'
});
scheduleModel_1.ScheduleModel.hasOne(exports.ScheduleSwapModel, {
    foreignKey: 'scheduleSwapScheduleId',
    as: 'scheduleSWap'
});
