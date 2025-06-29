"use strict";
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
 *       required:
 *         - attendanceScheduleId
 *         - attendanceStoreId
 *         - attendancePhoto
 *         - attendanceCategory
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
