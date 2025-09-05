"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     ILocationRequest:
 *       type: object
 *       properties:
 *         latitude:
 *           type: string
 *           example: "12.345"
 *         longitude:
 *           type: string
 *           example: "123.456"
 *       required:
 *         - latitude
 *         - longitude
 *
 */
/**
 * @swagger
 * /api/v1/reports/:
 *   get:
 *     summary: Get all report
 *     tags: [REPORTS]
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
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: List of report
 */
/**
 * @swagger
 * /api/v1/reports/locations/realtimes:
 *   post:
 *     summary: realtime locations
 *     tags: [REPORTS]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ILocationRequest'
 *     responses:
 *       200:
 *         description: List of report
 *
 */
