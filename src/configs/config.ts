import dotenv from 'dotenv';

dotenv.config();

const requiredVars = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
];

const missingEnv = requiredVars.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
    console.error(`Missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
}

export const config = {
    PORT: parseInt(process.env.PORT || '3000', 10),
    HOST: process.env.HOST || '0.0.0.0',
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

    db: {
        type: 'postgres' as const,
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT!, 10),
        username: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
    },
};
