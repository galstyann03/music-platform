import path from 'path';
import fs from 'fs';

import dotenv from 'dotenv';

dotenv.config();

const findConfigJson = (): string => {
    let currentPath = process.cwd();
    const rootPath = path.parse(currentPath).root;

    while (currentPath !== rootPath) {
        const configPath = path.join(currentPath, 'config.json');
        if (fs.existsSync(configPath)) {
            return configPath;
        }
        currentPath = path.dirname(currentPath);
    }

    throw new Error('config.json not found in project root');
};

const configJsonPath = findConfigJson();
if (!fs.existsSync(configJsonPath)) {
    console.error(`config.json not found at ${configJsonPath}`);
    process.exit(1);
}

const configJson = JSON.parse(fs.readFileSync(configJsonPath, 'utf-8'));

const ENV = process.env.ENV || 'local';
const environmentConfig = configJson.environments[ENV];

if (!environmentConfig) {
    console.error(`No environment config found for ENV=${ENV}. Available: ${Object.keys(configJson.environments).join(', ')}`);
    process.exit(1);
}

const requiredVars = [
    'DB_USER',
    'DB_PASSWORD',
];

const missingEnv = requiredVars.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
    console.error(`Missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
}

export const config = {
    ENV,
    VERSION: configJson.global.VERSION,
    PORT: configJson.global.PORT,
    HOST: configJson.global.HOST,
    LOG_LEVEL: configJson.global.LOG_LEVEL,

    db: {
        type: 'postgres' as const,
        host: environmentConfig.DB_HOST,
        port: environmentConfig.DB_PORT,
        username: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: environmentConfig.DB_NAME,
    },
};
