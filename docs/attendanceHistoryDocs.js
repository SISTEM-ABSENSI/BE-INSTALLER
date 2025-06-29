"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     jwtPayloadSchema:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         username:
 *           type: string
 *           example: "john_doe"
 *         iat:
 *           type: integer
 *           example: 1717029203
 *         exp:
 *           type: integer
 *           example: 1717032803
 *
 *     IFindOneAttendanceHistoryRequest:
 *       type: object
 *       properties:
 *         jwtPayload:
 *           $ref: '#/components/schemas/jwtPayloadSchema'
 *         attendanceHistoryId:
 *           type: number
 *           example: 1001
 *       required:
 *         - jwtPayload
 *         - attendanceHistoryId
 *
 *     IFindAllAttendanceHistoriesRequest:
 *       type: object
 *       properties:
 *         jwtPayload:
 *           $ref: '#/components/schemas/jwtPayloadSchema'
 *         page:
 *           type: integer
 *           example: 1
 *         size:
 *           type: integer
 *           example: 10
 *         search:
 *           type: string
 *           example: "checkin"
 *         pagination:
 *           type: boolean
 *           example: true
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2025-04-01T00:00:00Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2025-04-30T23:59:59Z"
 *         attendanceHistoryUserId:
 *           type: number
 *           nullable: true
 *           example: 101
 *         attendanceHistoryScheduleId:
 *           type: number
 *           nullable: true
 *           example: 501
 */
/**
 * @swagger
 * /api/v1/attendance-histories/detail/{attendanceHistoryId}:
 *   get:
 *     summary: Get attendance history detail by ID
 *     tags: [ATTENDANCE HISTORIES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attendanceHistoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Attendance history detail
 *       404:
 *         description: Attendance history not found
 */
/**
 * @swagger
 * /api/v1/attendance-histories/:
 *   get:
 *     summary: Get all attendance histories with filters
 *     tags: [ATTENDANCE HISTORIES]
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
 *       - in: query
 *         name: attendanceHistoryUserId
 *         schema:
 *           type: number
 *       - in: query
 *         name: attendanceHistoryScheduleId
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of attendance histories
 */
