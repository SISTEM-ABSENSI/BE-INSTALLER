"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IResetDeviceCreateRequest:
 *       type: object
 *       properties:
 *         resetDeviceWhatsappNumber:
 *           type: string
 *           example: "628123456789"
 *           description: Nomor WhatsApp pengguna
 *         resetDeviceDeviceId:
 *           type: string
 *           example: "device_12345"
 *           description: ID perangkat yang akan di-reset
 *       required:
 *         - resetDeviceWhatsappNumber
 *         - resetDeviceDeviceId
 *
 *     IResetDeviceUpdateRequest:
 *       type: object
 *       properties:
 *         resetDeviceId:
 *           type: number
 *           example: 123
 *           description: ID dari permintaan reset device
 *         resetDeviceStatus:
 *           type: string
 *           enum:
 *             - waiting
 *             - accepted
 *             - rejected
 *           example: accepted
 *           description: Status baru dari permintaan reset
 *       required:
 *         - resetDeviceId
 *         - resetDeviceStatus
 *
 *     IResetDeviceDetailResponse:
 *       type: object
 *       properties:
 *         resetDeviceId:
 *           type: number
 *           example: 123
 *         resetDeviceUserId:
 *           type: number
 *           example: 456
 *         resetDeviceDeviceId:
 *           type: string
 *           example: "device_12345"
 *         resetDeviceWhatsappNumber:
 *           type: string
 *           example: "628123456789"
 *         resetDeviceStatus:
 *           type: string
 *           enum:
 *             - waiting
 *             - accepted
 *             - rejected
 *           example: accepted
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-05T10:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-05T10:30:00Z"
 *
 *     IResetDeviceListResponse:
 *       type: object
 *       properties:
 *         totalItems:
 *           type: integer
 *           example: 1
 *         currentPage:
 *           type: integer
 *           example: 0
 *         totalPages:
 *           type: integer
 *           example: 1
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IResetDeviceDetailResponse'
 */
/**
 * @swagger
 * /api/v1/reset-devices:
 *   post:
 *     summary: Membuat permintaan reset device baru
 *     tags: [RESET_DEVICE]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IResetDeviceCreateRequest'
 *     responses:
 *       201:
 *         description: Permintaan reset berhasil dibuat
 *       400:
 *         description: Validasi gagal atau input tidak sesuai
 */
/**
 * @swagger
 * /api/v1/reset-devices:
 *   get:
 *     summary: Mengambil daftar semua permintaan reset device
 *     tags: [RESET_DEVICE]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 0
 *         description: Halaman data (default = 0)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Jumlah data per halaman (default = 10)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "628123456789"
 *         description: Kata kunci pencarian (opsional)
 *       - in: query
 *         name: resetDeviceStatus
 *         schema:
 *           type: string
 *           enum:
 *             - waiting
 *             - accepted
 *             - rejected
 *           example: waiting
 *         description: Filter berdasarkan status
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2025-04-01T00:00:00Z"
 *         description: Filter berdasarkan tanggal mulai
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2025-04-30T23:59:59Z"
 *         description: Filter berdasarkan tanggal akhir
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Menampilkan dengan paginasi (true/false)
 *       - in: query
 *         name: deviceId
 *         schema:
 *           type: string
 *           example: "12eEREdfdfw43RWERWefsfsdf"
 *         description: device id user
 *     responses:
 *       200:
 *         description: Daftar permintaan reset berhasil diambil
 *       400:
 *         description: Parameter tidak valid
 */
/**
 * @swagger
 * /api/v1/reset-devices/detail/{resetDeviceId}:
 *   get:
 *     summary: Melihat detail permintaan reset device berdasarkan ID
 *     tags: [RESET_DEVICE]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resetDeviceId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       200:
 *         description: Detail permintaan reset berhasil diambil
 *       400:
 *         description: ID tidak valid
 *       404:
 *         description: Data tidak ditemukan
 */
/**
 * @swagger
 * /api/v1/reset-devices/by-device-id/{deviceId}:
 *   get:
 *     summary: get detail by device ID
 *     tags: [RESET_DEVICE]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *           example: "3r324erwedsfsd3"
 *     responses:
 *       200:
 *         description: Detail permintaan reset berhasil diambil
 *       400:
 *         description: ID tidak valid
 *       404:
 *         description: Data tidak ditemukan
 */
/**
 * @swagger
 * /api/v1/reset-devices:
 *   patch:
 *     summary: Memperbarui status permintaan reset device
 *     tags: [RESET_DEVICE]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IResetDeviceUpdateRequest'
 *     responses:
 *       200:
 *         description: Status permintaan reset berhasil diperbarui
 *       400:
 *         description: ID atau status tidak valid
 *       404:
 *         description: Data tidak ditemukan
 */
