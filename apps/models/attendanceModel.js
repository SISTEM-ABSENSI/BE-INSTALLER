"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
const storeModel_1 = require("./storeModel");
const user_1 = require("./user");
const scheduleModel_1 = require("./scheduleModel");
exports.AttendanceModel = index_1.sequelize.define('Attendances', {
    ...zygote_1.ZygoteModel,
    attendanceId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    attendanceScheduleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    attendanceUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    attendanceStoreId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    attendanceTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    attendanceCategory: {
        type: sequelize_1.DataTypes.ENUM('checkin', 'checkout', 'breakin', 'breakout', 'otin', 'otout'),
        allowNull: false
    },
    attendancePhoto: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    attendanceLatitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    attendanceLongitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    attendanceDistanceFromStore: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'attendances',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});
exports.AttendanceModel.belongsTo(storeModel_1.StoreModel, { foreignKey: 'attendanceStoreId', as: 'store' });
storeModel_1.StoreModel.hasOne(exports.AttendanceModel, { foreignKey: 'attendanceStoreId', as: 'attendance' });
exports.AttendanceModel.belongsTo(user_1.UserModel, { foreignKey: 'attendanceUserId', as: 'user' });
user_1.UserModel.hasOne(exports.AttendanceModel, { foreignKey: 'attendanceUserId', as: 'attendance' });
exports.AttendanceModel.belongsTo(scheduleModel_1.ScheduleModel, {
    foreignKey: 'attendanceScheduleId',
    as: 'schedule'
});
scheduleModel_1.ScheduleModel.hasOne(exports.AttendanceModel, {
    foreignKey: 'attendanceScheduleId',
    as: 'attendance'
});
