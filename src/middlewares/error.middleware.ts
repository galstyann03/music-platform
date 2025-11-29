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

    try {
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
    } catch (parseError) {
        logger.error(`Error parsing error response: ${ parseError instanceof Error ? parseError.message : 'Unknown error' }`);
        response = { status: 500, message: 'Internal Server Error' };
    }

    try {
        res.status(status).json(response);
    } catch (jsonError) {
        logger.error(`Error sending JSON response: ${ jsonError instanceof Error ? jsonError.message : 'Unknown error' }`);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
    next(AppError.notFound(`Route ${ req.method } ${ req.path } not found`));
};
