import morgan from 'morgan';
import { Request } from 'express';
import { stringify } from 'flatted';

import { logger } from '../configs/winston.config';

morgan.token('body', (req: Request): string => {
    if (req.method === 'GET' || !req.body || !Object.keys(req.body).length) {
        return '';
    }
    return stringify(req.body);
});

const customFormat = ':method :url :status :res[content-length] - :response-time ms :body';

export const morganMiddleware = morgan(customFormat, {
    stream: {
        write: (message: string) => logger.http(message.trim()),
    },
});
