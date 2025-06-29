"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IStoreRequest:
 *       type: object
 *       properties:
 *         storeName:
 *           type: string
 *           example: "Toko Baju Kekinian"
 *         storeAddress:
 *           type: string
 *           example: "Jl. Jendral Sudirman No. 123"
 *         storeLongitude:
 *           type: string
 *           example: "106.8167"
 *         storeLatitude:
 *           type: string
 *           example: "-6.2145"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-05T10:00:00Z"
 *       required:
 *         - storeName
 *         - storeAddress
 *         - storeLongitude
 *         - storeLatitude
 *
 *     IStoreUpdateRequest:
 *       type: object
 *       properties:
 *         storeId:
 *           type: number
 *           example: 1
 *         storeName:
 *           type: string
 *           nullable: true
 *           example: "Toko Baju Kekinian"
 *         storeAddress:
 *           type: string
 *           example: "Jl. Jendral Sudirman No. 123"
 *         storeLongitude:
 *           type: string
 *           nullable: true
 *           example: "106.8167"
 *         storeLatitude:
 *           type: string
 *           nullable: true
 *           example: "-6.2145"
 *       required:
 *         - jwtPayload
 *         - storeId
 *         - storeAddress
 */
/**
 * @swagger
 * /api/v1/stores/:
 *   get:
 *     summary: Get all stores
 *     tags: [STORES]
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
 *         description: List of stores
 */
/**
 * @swagger
 * /api/v1/stores/detail/{storeId}:
 *   get:
 *     summary: Get store detail by ID
 *     tags: [STORES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Store detail
 *       404:
 *         description: Store not found
 */
/**
 * @swagger
 * /api/v1/stores/:
 *   post:
 *     summary: Create a new store
 *     tags: [STORES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IStoreRequest'
 *     responses:
 *       201:
 *         description: Store created successfully
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * /api/v1/stores/:
 *   patch:
 *     summary: Update a store
 *     tags: [STORES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IStoreUpdateRequest'
 *     responses:
 *       200:
 *         description: Store updated successfully
 *       404:
 *         description: Store not found
 */
/**
 * @swagger
 * /api/v1/stores/{storeId}:
 *   delete:
 *     summary: Delete a store
 *     tags: [STORES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Store deleted successfully
 */
