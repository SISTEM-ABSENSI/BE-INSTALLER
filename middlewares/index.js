"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const access_1 = require("./access");
const authToken_1 = require("./authToken");
const roleGuard_1 = require("./roleGuard");
exports.middleware = { useAuthorization: access_1.useAuthorization, allowRoles: roleGuard_1.allowRoles, useAutToken: authToken_1.useAutToken };
