"use strict";
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     IAdminRegisterRequest:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           example: John Doe
 *         userWhatsappNumber:
 *           type: string
 *           example: 62822222222222
 *         userPassword:
 *           type: string
 *           example: qwerty
 *         userRole:
 *           type: string
 *           example: superAdmin
 *     IAdminUpdateRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: number
 *           example: 1
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
 *           example: superAdmin
 *     IAdminLoginRequest:
 *       type: object
 *       properties:
 *         userWhatsappNumber:
 *           type: string
 *           example: 6281234567894
 *         userPassword:
 *           type: string
 *           example: qwerty
 */
/**
 * @swagger
 * /api/v1/admins/:
 *   get:
 *     summary: Get all admins
 *     tags: [ADMINS]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of admins
 */
/**
 * @swagger
 * /api/v1/admins/detail/{userId}:
 *   get:
 *     summary: Get admin detail by ID
 *     tags: [ADMINS]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin detail
 *       404:
 *         description: Admin not found
 */
/**
 * @swagger
 * /api/v1/admins/:
 *   patch:
 *     summary: Update an admin
 *     tags: [ADMINS]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IAdminUpdateRequest'
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *       404:
 *         description: Admin not found
 */
/**
 * @swagger
 * /api/v1/admins/:
 *   delete:
 *     summary: Delete an admin
 *     tags: [ADMINS]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 */
/**
 * @swagger
 * /api/v1/admins/login:
 *   post:
 *     summary: Login admin
 *     tags: [ADMINS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IAdminLoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
/**
 * @swagger
 * /api/v1/admins/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [ADMINS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IAdminRegisterRequest'
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Invalid input
 */
