'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ScheduleModel = void 0
/* eslint-disable @typescript-eslint/indent */
const sequelize_1 = require('sequelize')
const index_1 = require('./index')
const zygote_1 = require('./zygote')
const storeModel_1 = require('./storeModel')
const user_1 = require('./user')
exports.ScheduleModel = index_1.sequelize.define(
  'Schedules',
  {
    ...zygote_1.ZygoteModel,
    scheduleId: {
      type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    scheduleName: {
      type: sequelize_1.DataTypes.STRING(100),
      allowNull: false
    },
    scheduleUserId: {
      type: sequelize_1.DataTypes.INTEGER,
      allowNull: false
    },
    scheduleStoreId: {
      type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Stores',
        key: 'storeId'
      }
    },
    scheduleStartDate: {
      type: sequelize_1.DataTypes.STRING(250),
      allowNull: true
    },
    scheduleEndDate: {
      type: sequelize_1.DataTypes.STRING(250),
      allowNull: true
    },
    scheduleStatus: {
      type: sequelize_1.DataTypes.ENUM('waiting', 'progress', 'swap', 'done'),
      allowNull: true,
      defaultValue: 'waiting'
    }
  },
  {
    tableName: 'schedules',
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
)
exports.ScheduleModel.belongsTo(storeModel_1.StoreModel, {
  foreignKey: 'scheduleStoreId',
  as: 'store'
})
storeModel_1.StoreModel.hasOne(exports.ScheduleModel, {
  foreignKey: 'scheduleStoreId',
  as: 'schedule'
})
exports.ScheduleModel.belongsTo(user_1.UserModel, {
  foreignKey: 'scheduleUserId',
  as: 'user'
})
user_1.UserModel.hasOne(exports.ScheduleModel, {
  foreignKey: 'scheduleUserId',
  as: 'schedule'
})
