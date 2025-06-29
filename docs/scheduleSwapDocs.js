"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IScheduleSwapRequest:
 *       type: object
 *       properties:
 *         scheduleSwapReciverUserId:
 *           type: number
 *           example: 102
 *         scheduleSwapScheduleId:
 *           type: number
 *           example: 501
 *       required:
 *         - scheduleSwapReciverUserId
 *         - scheduleSwapScheduleId
 *
 *     IScheduleSwapUpdateRequest:
 *       type: object
 *       properties:
 *         scheduleSwapId:
 *           type: number
 *           example: 601
 *         scheduleSwapRequestUserId:
 *           type: number
 *           nullable: true
 *           example: 101
 *         scheduleSwapReciverUserId:
 *           type: number
 *           nullable: true
 *           example: 102
 *         scheduleSwapScheduleId:
 *           type: number
 *           nullable: true
 *           example: 501
 *         scheduleSwapStatus:
 *           type: string
 *           enum: [pending, accepted, rejected, cancelled]
 *           nullable: true
 *           example: accepted
 *       required:
 *         - scheduleSwapId
 */
/**
 * @swagger
 * /api/v1/schedule-swaps/:
 *   post:
 *     summary: Create a new schedule swap request
 *     tags: [SCHEDULE SWAPS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IScheduleSwapRequest'
 *     responses:
 *       201:
 *         description: Schedule swap created successfully
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * /api/v1/schedule-swaps/:
 *   patch:
 *     summary: Update an existing schedule swap
 *     tags: [SCHEDULE SWAPS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IScheduleSwapUpdateRequest'
 *     responses:
 *       200:
 *         description: Schedule swap updated successfully
 *       404:
 *         description: Schedule swap not found
 */
/**
 * @swagger
 * /api/v1/schedule-swaps/{scheduleSwapId}:
 *   delete:
 *     summary: Delete a schedule swap by ID
 *     tags: [SCHEDULE SWAPS]
 *     parameters:
 *       - in: path
 *         name: scheduleSwapId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Schedule swap deleted successfully
 *       404:
 *         description: Schedule swap not found
 */
/**
 * @swagger
 * /api/v1/schedule-swaps/detail/{scheduleSwapId}:
 *   get:
 *     summary: Get schedule swap detail by ID
 *     tags: [SCHEDULE SWAPS]
 *     parameters:
 *       - in: path
 *         name: scheduleSwapId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Schedule swap detail
 *       404:
 *         description: Schedule swap not found
 */
/**
 * @swagger
 * /api/v1/schedule-swaps/:
 *   get:
 *     summary: Get all schedule swaps
 *     tags: [SCHEDULE SWAPS]
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
 *         name: scheduleSwapStatus
 *         schema:
 *           type: string
 *           enum: [pending, accepted, rejected, cancelled]
 *       - in: query
 *         name: scheduleSwapCategory
 *         required: false
 *         schema:
 *           type: string
 *           enum: [request, reciver]
 *     responses:
 *       200:
 *         description: List of schedule swaps
 */
