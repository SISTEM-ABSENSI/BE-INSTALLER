"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
// Define the UserModel
exports.UserModel = _1.sequelize.define('Users', {
    ...zygote_1.ZygoteModel,
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userSupplierId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userPassword: {
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
    },
    userContact: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: true, // Setting timestamps to true for createdAt and updatedAt
    paranoid: true, // Enables soft deletes with deletedAt
    underscored: true, // Converts camelCase to snake_case for columns
    freezeTableName: true, // Disables plural table names
    engine: 'InnoDB'
});
