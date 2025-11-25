import { Router, Request, Response, NextFunction } from 'express';

import healthRouter from './health.routes';

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

// TODO: Add more routes here
// router.use('/artists', artistRoutes);
// router.use('/albums', albumRoutes);
// etc.

export default router;
