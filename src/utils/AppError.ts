export class AppError extends Error {
    public readonly status: number;

    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }

    // Static factory methods for common errors
    static badRequest(message: string = 'Bad Request') {
        return new AppError(message, 400);
    }

    static unauthorized(message: string = 'Unauthorized') {
        return new AppError(message, 401);
    }

    static forbidden(message: string = 'Forbidden') {
        return new AppError(message, 403);
    }

    static notFound(message: string = 'Not Found') {
        return new AppError(message, 404);
    }

    static conflict(message: string = 'Conflict') {
        return new AppError(message, 409);
    }

    static internal(message: string = 'Internal Server Error') {
        return new AppError(message, 500);
    }
}

export const isAppError = (error: unknown): error is AppError => {
    return error instanceof AppError;
};

