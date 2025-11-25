import { Request, Response, NextFunction } from 'express';

import { logger } from '../configs/winston.config';
import { AppError, isAppError, isValidationError, formatValidationErrors, ValidationErrorResponse } from '../utils';

interface ErrorResponse {
    status: number;
    message: string;
    errors?: ValidationErrorResponse[];
}

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    let status = 500;
    let message = 'Internal Server Error';
    let response: ErrorResponse = { status, message };

    if (isValidationError(err)) {
        status = 400;
        const { structuredErrors } = formatValidationErrors(err);
        response = { status, message: 'Validation failed', errors: structuredErrors };
        logger.warn(`[${ status }] Validation failed: ${ JSON.stringify(structuredErrors, null, 2) }`);
    } else if (isAppError(err)) {
        status = err.status;
        message = err.message;
        response = { status, message };
        logger.error(`[${ status }] ${ message }\n${ (err as Error)?.stack || '' }`);
    } else if (err instanceof Error) {
        message = err.message;
        response = { status, message };
        logger.error(`[${ status }] ${ message }\n${ (err as Error)?.stack || '' }`);
    } else {
        logger.error(`[${ status }] ${ message }\n${ (err as Error)?.stack || '' }`);
    }
    res.status(status).json(response);
};

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
    next(AppError.notFound(`Route ${ req.method } ${ req.path } not found`));
};
