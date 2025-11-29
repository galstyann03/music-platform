import { Router, Request, Response, NextFunction } from 'express';

import healthRouter from './health.routes';
import userRouter from './user.routes';
import artistRouter from './artist.routes';
import albumRouter from './album.routes';
import songRouter from './song.routes';
import playlistRouter from './playlist.routes';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.status(200).json({
            name: 'Music Platform API',
            version: '1.0.0',
            description: 'Spotify-like Music Platform Database System',
        });
    } catch (error) {
        next(error);
    }
});

// Health routes
router.use('/health', healthRouter);

// CRUD routes
router.use('/users', userRouter);
router.use('/artists', artistRouter);
router.use('/albums', albumRouter);
router.use('/songs', songRouter);
router.use('/playlists', playlistRouter);

export default router;
