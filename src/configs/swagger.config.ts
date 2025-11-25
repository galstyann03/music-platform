import swaggerJSDoc from 'swagger-jsdoc';

import { config } from './config';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Music Platform API',
            version: '1.0.0',
            description: 'Music Platform API documentation - Spotify-like Database System',
        },
        servers: [
            {
                url: `http://localhost:${config.PORT}`,
                description: 'Development server (Docker)',
            },
        ],
    },
    apis: [
        './src/routes/**/*.{js,ts}',
        './src/swagger/*.yaml',
    ],
};

const swaggerSpec: object = swaggerJSDoc(options);

export default swaggerSpec;
