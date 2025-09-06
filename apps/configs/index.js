"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_CONFIGS = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.APP_CONFIGS = {
    appVersion: process.env.APP_VERSION ?? '',
    appSemantic: process.env.APP_SEMANTIC ?? '',
    appMode: process.env.APP_MODE ?? 'development',
    appUrl: process.env.APP_URL,
    env: process.env.APP_ENV,
    port: process.env.APP_PORT ?? 8000,
    log: process.env.APP_LOG === 'true',
    ipBlackList: JSON.parse(process.env.IP_BLACK_LIST ?? '[]'),
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    secret: {
        keyEncryption: process.env.SECRET_KEY_ENCRYPTION,
        passwordEncryption: process.env.SECRET_PASSWORD_ENCRYPTION,
        pinEncryption: process.env.SECRET_PIN_ENCRYPTION,
        token: process.env.TOKEN_SECRET,
        authToken: process.env.AUTH_TOKEN
    },
    wablas: {
        url: process.env.WABLAS_URL,
        token: `${process.env.WABLAS_API_KEY}.${process.env.WABLAS_SECRET_KEY}`
    },
    maximumUploadFile: process.env.MAXIMUM_UPLOAD_FILE ?? 1024,
    dataBase: {
        development: {
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            timezone: '+07:00',
            dialectOptions: {
                dateStrings: true,
                typeCast: true
            },
            dialect: process.env.DB_DIALECT,
            logging: process.env.DB_LOG === 'true',
            port: parseInt(process.env.DB_PORT ?? '3306')
        },
        testing: {
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            logging: process.env.DB_LOG === 'true'
        },
        production: {
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            logging: process.env.DB_LOG === 'true'
        }
    }
};
