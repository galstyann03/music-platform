import { Router } from 'express';

import { songController } from '../containers/song.container';

const songRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: Song management endpoints
 */

/**
 * @swagger
 * /api/songs:
 *   post:
 *     summary: Create a new song
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - duration
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 200
 *                 example: "City Lights"
 *               albumId:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *               duration:
 *                 type: integer
 *                 minimum: 1
 *                 example: 215
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 example: "2021-09-10"
 *               language:
 *                 type: string
 *                 maxLength: 50
 *                 example: "English"
 *               lyrics:
 *                 type: string
 *                 example: "Lyrics for City Lights..."
 *     responses:
 *       201:
 *         description: Song created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Song created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Song'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Album not found (if albumId provided)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Album not found"
 */
songRouter.post('/', songController.create);

/**
 * @swagger
 * /api/songs:
 *   get:
 *     summary: Get all songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: List of all songs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Songs retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Song'
 *                 count:
 *                   type: integer
 *                   example: 10
 */
songRouter.get('/', songController.findAll);

/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     summary: Get song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Song ID
 *     responses:
 *       200:
 *         description: Song details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Song retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Song'
 *       404:
 *         description: Song not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Song not found"
 */
songRouter.get('/:id', songController.findOne);

/**
 * @swagger
 * /api/songs/{id}:
 *   put:
 *     summary: Update song
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Song ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 200
 *               albumId:
 *                 type: integer
 *                 nullable: true
 *               duration:
 *                 type: integer
 *                 minimum: 1
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               language:
 *                 type: string
 *                 maxLength: 50
 *               lyrics:
 *                 type: string
 *     responses:
 *       200:
 *         description: Song updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Song updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Song'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Song or Album not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Song not found"
 */
songRouter.put('/:id', songController.update);

/**
 * @swagger
 * /api/songs/{id}:
 *   delete:
 *     summary: Delete song
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Song ID
 *     responses:
 *       200:
 *         description: Song deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Song deleted successfully"
 *       404:
 *         description: Song not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Song not found"
 */
songRouter.delete('/:id', songController.remove);

export default songRouter;
