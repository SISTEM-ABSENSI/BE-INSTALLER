"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     AttendanceReport:
 *       type: object
 *       properties:
 *         Nama:
 *           type: string
 *           description: User's name
 *         No_HP:
 *           type: string
 *           description: User's WhatsApp number
 *         Jam_Masuk_Jadwal:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Schedule start time in dd/mm/yyyy hh:mm:ss format
 *         Jam_Pulang_Jadwal:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Schedule end time in dd/mm/yyyy hh:mm:ss format
 *         Absen:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Attendance time in dd/mm/yyyy hh:mm:ss format
 *         Jarak:
 *           type: number
 *           nullable: true
 *           description: Distance from store in meters (2 decimal places)
 *         Keterangan:
 *           type: string
 *           enum: [checkin, checkout, breakin, breakout, otin, otout]
 *           nullable: true
 *           description: Attendance category
 *     ResponseData:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             count:
 *               type: number
 *             rows:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AttendanceReport'
 *
 * /api/v1/attendances/reports:
 *   get:
 *     summary: Retrieve attendance report
 *     tags: [ATTENDANCES-REPORTS]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           default: '2025-07-28'
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *         description: Start date in YYYY-MM-DD format to filter the report (optional)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           default: '2025-07-29'
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *         description: End date in YYYY-MM-DD format to filter the report (optional)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Page number for pagination (optional, defaults to 0)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of items per page (optional, defaults to 10)
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Enable pagination (optional, defaults to false)
 *     responses:
 *       200:
 *         description: Attendance report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseData'
 *       400:
 *         description: Invalid request query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 */
