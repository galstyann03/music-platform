import { Request, Response, NextFunction } from 'express';

import { HealthService } from '../services/health.service';
import { AppError } from '../utils/AppError';
import { logger } from '../configs/winston.config';

export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    liveness = (_req: Request, res: Response, next: NextFunction): void => {
        try {
            const status = this.healthService.liveness();
            res.status(200).json({
                status,
                uptime: process.uptime(),
                timestamp: new Date().toISOString(),
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unexpected error';
            logger.error(`Liveness check failed: ${message}`, {
                stack: err instanceof Error ? err.stack?.split('\n') : undefined,
            });
            next(AppError.internal('Liveness check failed'));
        }
    };

    readiness = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.healthService.readiness();
            res.status(200).json({
                status: 'READY',
                database: 'connected',
                timestamp: new Date().toISOString(),
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unexpected error';
            logger.error(`Readiness check failed: ${message}`, {
                stack: err instanceof Error ? err.stack?.split('\n') : undefined,
            });
            next(AppError.internal('Readiness check failed'));
        }
    };
}
