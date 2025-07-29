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
      title: 'Sistem Absensi Dinasti Documentations',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key'
        }
      }
    },
    security: [
      {
        ApiKeyAuth: []
      }
    ]
  },
  apis: ['./docs/public/*.js']
}
const swaggerSpecPublic = (0, swagger_jsdoc_1.default)(options)
exports.default = swaggerSpecPublic
