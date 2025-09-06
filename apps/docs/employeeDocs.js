"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IFindAllEmployeeRequest:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *           example: 0
 *         size:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *           example: 10
 *         userRole:
 *           type: string
 *           nullable: true
 *           example: "employee"
 *         search:
 *           type: string
 *           nullable: true
 *           example: "John"
 *         pagination:
 *           type: boolean
 *           default: true
 *           example: true
 *         employeeId:
 *           type: string
 *           nullable: true
 *           example: "EMP-001"
 *
 *     IFindDetailEmployeeRequest:
 *       type: object
 *       properties:
 *         employeeId:
 *           type: string
 *           example: "EMP-001"
 *       required:
 *         - employeeId
 *
 *     IEmployeeUpdateRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: number
 *           example: 1
 *         userWhatsappNumber:
 *           type: string
 *           example: "6284455334434"
 *         userDeviceId:
 *           type: string
 *           example: "2131231233112"
 *       required:
 *         - userId
 */
/**
 * @swagger
 * /api/v1/employees/:
 *   get:
 *     summary: Get list of employees with filters
 *     tags: [EMPLOYEES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *       - in: query
 *         name: userRole
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *           default: true
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees
 */
/**
 * @swagger
 * /api/v1/employees/detail/{employeeId}:
 *   get:
 *     summary: Get employee detail by ID
 *     tags: [EMPLOYEES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee detail
 *       404:
 *         description: Employee not found
 */
/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Register a new admin
 *     tags: [EMPLOYEES]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IEmployeeUpdateRequest'
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     IEmployeeLocationRequest:
 *       type: object
 *       properties:
 *         employeeLocationLatitude:
 *           type: string
 *           example: "12.345"
 *         employeeLocationLongitude:
 *           type: string
 *           example: "123.456"
 *       required:
 *         - employeeLocationLatitude
 *         - employeeLocationLongitude
 *
 */
/**
 * @swagger
 * /api/v1/employees/locations:
 *   get:
 *     summary: Get list of employee locations
 *     tags: [EMPLOYEES]
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
 *     responses:
 *       200:
 *         description: List of employee locations
 */
/**
 * @swagger
 * /api/v1/employees/locations:
 *   post:
 *     summary: employees locations
 *     tags: [EMPLOYEES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IEmployeeLocationRequest'
 *     responses:
 *       200:
 *         description: List of report
 *
 */
