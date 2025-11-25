import cors from 'cors';
import { Application } from 'express';

export const addCors = (app: Application): void => {
    const corsOptions: cors.CorsOptions = {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false,
    };

    app.use(cors(corsOptions));
};
