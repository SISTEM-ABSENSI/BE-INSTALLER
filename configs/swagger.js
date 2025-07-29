'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const swagger_jsdoc_1 = __importDefault(require('swagger-jsdoc'))
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Welcome to Sistem Absensi Documentations',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  tags: [
    {
      name: 'APP',
      description: 'App-related endpoints'
    },
    {
      name: 'AUTH',
      description: 'Auth-related endpoints'
    },
    {
      name: 'USERS',
      description: 'User-related endpoints'
    },
    {
      name: 'STORES',
      description: 'User-related endpoints'
    },
    {
      name: 'SCHEDULES',
      description: 'User-related endpoints'
    },
    {
      name: 'SCHEDULE SWAPS',
      description: 'Schedule Swaps-related endpoints'
    }
  ],
  apis: ['./docs/*.js']
}
const swaggerSpec = (0, swagger_jsdoc_1.default)(options)
exports.default = swaggerSpec
