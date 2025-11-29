import { Router } from 'express';

import { albumController } from '../containers/album.container';

const albumRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Albums
 *   description: Album management endpoints
 */

/**
 * @swagger
 * /api/albums:
 *   post:
 *     summary: Create a new album
 *     tags: [Albums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - artistId
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 200
 *                 example: "City Lights"
 *               artistId:
 *                 type: integer
 *                 example: 1
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 example: "2021-09-10"
 *               coverImageUrl:
 *                 type: string
 *                 maxLength: 500
 *                 example: "https://example.com/covers/city_lights.jpg"
 *     responses:
 *       201:
 *         description: Album created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Album created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Album'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Artist not found
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
 *                   example: "Artist not found"
 */
albumRouter.post('/', albumController.create);

/**
 * @swagger
 * /api/albums:
 *   get:
 *     summary: Get all albums
 *     tags: [Albums]
 *     responses:
 *       200:
 *         description: List of all albums
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Albums retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Album'
 *                 count:
 *                   type: integer
 *                   example: 10
 */
albumRouter.get('/', albumController.findAll);

/**
 * @swagger
 * /api/albums/{id}:
 *   get:
 *     summary: Get album by ID
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Album ID
 *     responses:
 *       200:
 *         description: Album details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Album retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Album'
 *       404:
 *         description: Album not found
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
albumRouter.get('/:id', albumController.findOne);

/**
 * @swagger
 * /api/albums/{id}:
 *   put:
 *     summary: Update album
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Album ID
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
 *               artistId:
 *                 type: integer
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               coverImageUrl:
 *                 type: string
 *                 maxLength: 500
 *     responses:
 *       200:
 *         description: Album updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Album updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Album'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Album or Artist not found
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
albumRouter.put('/:id', albumController.update);

/**
 * @swagger
 * /api/albums/{id}:
 *   delete:
 *     summary: Delete album
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Album ID
 *     responses:
 *       200:
 *         description: Album deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Album deleted successfully"
 *       404:
 *         description: Album not found
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
albumRouter.delete('/:id', albumController.remove);

export default albumRouter;
