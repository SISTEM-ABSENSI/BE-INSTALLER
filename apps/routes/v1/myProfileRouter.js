"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const myProfile_1 = require("../../controllers/myProfile");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.middleware.useAuthorization, async (req, res) => await myProfile_1.myProfileController.find(req, res));
router.patch('/', middlewares_1.middleware.useAuthorization, async (req, res) => await myProfile_1.myProfileController.update(req, res));
exports.default = router;
