"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otp_1 = require("../../controllers/otp");
const router = (0, express_1.Router)();
router.post('/request', async (req, res) => await otp_1.otpController.requestOtp(req, res));
router.post('/verify', async (req, res) => await otp_1.otpController.verifyOtp(req, res));
exports.default = router;
