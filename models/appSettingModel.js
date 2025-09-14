"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSettingModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
exports.AppSettingModel = index_1.sequelize.define('AppSettings', {
    ...zygote_1.ZygoteModel,
    appSettingId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    appSettingVersion: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    appSettingUpdateUrl: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    appSettingMaintenanceMode: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'app_settings',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
