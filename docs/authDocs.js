"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IUserRegisterRequest:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           example: John Doe
 *         userWhatsappNumber:
 *           type: string
 *           example: 6281234567890
 *         userPassword:
 *           type: string
 *           example: qwerty
 *         userRole:
 *           type: string
 *           example: user
 *         userDeviceId:
 *           type: string
 *           example: _
 *     IUserLoginRequest:
 *       type: object
 *       properties:
 *         userWhatsappNumber:
 *           type: string
 *           example: 6281234567891
 *         userPassword:
 *           type: string
 *           example: qwerty
 *         userDeviceId:
 *           type: string
 *           example: RP1A.200720.012.A105GDXS8CVL5
 */
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IUserLoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IUserRegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
