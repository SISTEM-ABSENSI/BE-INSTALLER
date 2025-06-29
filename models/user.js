"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.UserModel = _1.sequelize.define('Users', {
    ...zygote_1.ZygoteModel,
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userPassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userWhatsappNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userRole: {
        type: sequelize_1.DataTypes.ENUM('admin', 'superAdmin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    },
    userDeviceId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '_'
    }
}, {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
