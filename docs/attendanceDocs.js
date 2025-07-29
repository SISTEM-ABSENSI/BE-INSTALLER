'use strict'
/**
 * @swagger
 * components:
 *   schemas:
 *     IAttendanceRequest:
 *       type: object
 *       properties:
 *         attendanceScheduleId:
 *           type: number
 *           example: 1
 *         attendanceStoreId:
 *           type: number
 *           example: 1
 *         attendancePhoto:
 *           type: string
 *           example: "https://example.com/photo.jpg"
 *         attendanceCategory:
 *           type: string
 *           enum: [checkin, checkout]
 *           example: checkin
 *         attendanceLatitude:
 *           type: string
 *           example: 37.7749
 *         attendanceLongitude:
 *          type: string
 *          example: -122.4194
 *         attendanceDistanceFromStore:
 *          type: number
 *          example: 100
 *       required:
 *         - attendanceScheduleId
 *         - attendanceStoreId
 *         - attendancePhoto
 *         - attendanceCategory
 *         - attendanceLatitude
 *         - attendanceLongitude
 *         - attendanceDistanceFromStore
 */
/**
 * @swagger
 * /api/v1/attendances/:
 *   post:
 *     summary: Create a new attendance record
 *     tags: [ATTENDANCES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IAttendanceRequest'
 *     responses:
 *       201:
 *         description: Attendance created successfully
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * /api/v1/attendances/last-status:
 *   get:
 *     summary: Get last attendance status
 *     tags: [ATTENDANCES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Attendance detail
 *       404:
 *         description: Attendance not found
 */
/**
 * @swagger
 * /api/v1/attendances/last-all-status:
 *   get:
 *     summary: Get last attendance status
 *     tags: [ATTENDANCES]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance detail
 *       404:
 *         description: Attendance not found
 */
/**
 * @swagger
 * /api/v1/attendances/detail/{attendanceId}:
 *   get:
 *     summary: Get attendance detail by ID
 *     tags: [ATTENDANCES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attendanceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Attendance detail
 *       404:
 *         description: Attendance not found
 */
/**
 * @swagger
 * /api/v1/attendances/:
 *   get:
 *     summary: Get all attendances
 *     tags: [ATTENDANCES]
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
 *         name: attendanceCategory
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
 *         description: List of attendances
 */
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
 * /attendance/api/v1/attendances/reports:
 *   get:
 *     summary: Retrieve attendance report
 *     tags: [ATTENDANCES]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *         description: Start date in YYYY-MM-DD format to filter the report (optional)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *         description: End date in YYYY-MM-DD format to filter the report (optional)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Page number for pagination (optional)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of items per page (optional)
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *         description: Enable pagination (optional)
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
