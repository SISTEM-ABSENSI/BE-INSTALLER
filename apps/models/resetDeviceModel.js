"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetDeviceModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
const user_1 = require("./user");
exports.ResetDeviceModel = index_1.sequelize.define('ResetDevices', {
    ...zygote_1.ZygoteModel,
    resetDeviceId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    resetDeviceUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    resetDeviceDeviceId: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    resetDeviceStatus: {
        type: sequelize_1.DataTypes.ENUM('waiting', 'accepted', 'rejected'),
        allowNull: true,
        defaultValue: 'waiting'
    }
}, {
    tableName: 'reset_devices',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
exports.ResetDeviceModel.belongsTo(user_1.UserModel, { foreignKey: 'resetDeviceUserId', as: 'user' });
