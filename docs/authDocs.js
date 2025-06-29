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
 *           example: 6284455334434
 *         userPassword:
 *           type: string
 *           example: secret123
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
 *           example: 6284455334434
 *         userPassword:
 *           type: string
 *           example: secret123
 *         userDeviceId:
 *           type: string
 *           example: _
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
