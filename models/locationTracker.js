"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationTrackerModel = void 0;
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
const user_1 = require("./user");
exports.LocationTrackerModel = index_1.sequelize.define('LocationTrackers', {
    ...zygote_1.ZygoteModel,
    locationTrackerId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    locationTrackerUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    locationTrackerLatitude: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    locationTrackerLongitude: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    }
}, {
    tableName: 'location_trackers',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
exports.LocationTrackerModel.belongsTo(user_1.UserModel, {
    foreignKey: 'locationTrackerUserId',
    as: 'user'
});
