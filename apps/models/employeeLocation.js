"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeLocationModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
const user_1 = require("./user");
exports.EmployeeLocationModel = index_1.sequelize.define('EmployeeLocation', {
    ...zygote_1.ZygoteModel,
    employeeLocationId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    employeeLocationUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    employeeLocationLatitude: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    employeeLocationLongitude: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    }
}, {
    tableName: 'employee_locations',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
exports.EmployeeLocationModel.belongsTo(user_1.UserModel, {
    foreignKey: 'employeeLocationId',
    as: 'user'
});
user_1.UserModel.hasOne(exports.EmployeeLocationModel, {
    foreignKey: 'employeeLocationId',
    as: 'employeeLocation'
});
