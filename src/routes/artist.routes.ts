import { Router } from 'express';

import { artistController } from '../containers/artist.container';

const artistRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Artists
 *   description: Artist management endpoints
 */

/**
 * @swagger
 * /api/artists:
 *   post:
 *     summary: Create a new artist
 *     tags: [Artists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 150
 *                 example: "Aurora Echo"
 *               bio:
 *                 type: string
 *                 example: "Indie pop band known for dreamy synths and emotional lyrics."
 *               country:
 *                 type: string
 *                 maxLength: 100
 *                 example: "USA"
 *               debutYear:
 *                 type: integer
 *                 minimum: 1900
 *                 maximum: 2100
 *                 example: 2015
 *               profileImageUrl:
 *                 type: string
 *                 maxLength: 500
 *                 example: "https://example.com/images/aurora_echo.jpg"
 *     responses:
 *       201:
 *         description: Artist created successfully
 *       400:
 *         description: Validation error
 */
artistRouter.post('/', artistController.create);

/**
 * @swagger
 * /api/artists:
 *   get:
 *     summary: Get all artists
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: List of all artists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Artist'
 *                 count:
 *                   type: integer
 */
artistRouter.get('/', artistController.findAll);

/**
 * @swagger
 * /api/artists/{id}:
 *   get:
 *     summary: Get artist by ID
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Artist ID
 *     responses:
 *       200:
 *         description: Artist details
 *       404:
 *         description: Artist not found
 */
artistRouter.get('/:id', artistController.findOne);

/**
 * @swagger
 * /api/artists/{id}:
 *   put:
 *     summary: Update artist
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Artist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 150
 *               bio:
 *                 type: string
 *               country:
 *                 type: string
 *                 maxLength: 100
 *               debutYear:
 *                 type: integer
 *                 minimum: 1900
 *                 maximum: 2100
 *               profileImageUrl:
 *                 type: string
 *                 maxLength: 500
 *     responses:
 *       200:
 *         description: Artist updated successfully
 *       404:
 *         description: Artist not found
 */
artistRouter.put('/:id', artistController.update);

/**
 * @swagger
 * /api/artists/{id}:
 *   delete:
 *     summary: Delete artist
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Artist ID
 *     responses:
 *       200:
 *         description: Artist deleted successfully
 *       404:
 *         description: Artist not found
 */
artistRouter.delete('/:id', artistController.remove);

export default artistRouter;
