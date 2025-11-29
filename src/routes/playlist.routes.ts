import { Router } from 'express';

import { playlistController } from '../containers/playlist.container';

const playlistRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: Playlist management endpoints
 */

/**
 * @swagger
 * /api/playlists:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - title
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 maxLength: 100
 *                 example: "Focus Mode"
 *               description:
 *                 type: string
 *                 example: "Lo-fi and chill tracks for deep work."
 *               isPublic:
 *                 type: boolean
 *                 default: false
 *                 example: true
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found
 */
playlistRouter.post('/', playlistController.create);

/**
 * @swagger
 * /api/playlists:
 *   get:
 *     summary: Get all playlists
 *     tags: [Playlists]
 *     responses:
 *       200:
 *         description: List of all playlists
 */
playlistRouter.get('/', playlistController.findAll);

/**
 * @swagger
 * /api/playlists/{id}:
 *   get:
 *     summary: Get playlist by ID
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Playlist ID
 *     responses:
 *       200:
 *         description: Playlist details
 *       404:
 *         description: Playlist not found
 */
playlistRouter.get('/:id', playlistController.findOne);

/**
 * @swagger
 * /api/playlists/{id}:
 *   put:
 *     summary: Update playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Playlist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *               description:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Playlist updated successfully
 *       404:
 *         description: Playlist not found
 */
playlistRouter.put('/:id', playlistController.update);

/**
 * @swagger
 * /api/playlists/{id}:
 *   delete:
 *     summary: Delete playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Playlist ID
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
 *       404:
 *         description: Playlist not found
 */
playlistRouter.delete('/:id', playlistController.remove);

export default playlistRouter;
