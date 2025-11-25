import { createLogger, format, transports, addColors } from 'winston';
import { stringify } from 'flatted';

const customLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const customColors = {
    error: 'red bold',
    warn: 'yellow bold',
    info: 'cyan',
    http: 'magenta',
    debug: 'gray',
};

addColors(customColors);

const logFormat = format.printf(({ timestamp, level, message, ...meta }) => {
    return `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? stringify(meta) : ''
    }`;
});

const timestampFormat = format.timestamp({
    format: () =>
        new Date().toLocaleString('en-US', { timeZone: 'Asia/Yerevan' }),
});

export const logger = createLogger({
    levels: customLevels,
    level: 'debug',
    format: format.combine(
        format.colorize({ all: true }),
        timestampFormat,
        logFormat,
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/app.log',
        }),
    ],
    exitOnError: false,
});
