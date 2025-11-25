import { config } from './configs/config';
import { logger } from './configs/winston.config';
import AppDataSource from './configs/data-source';
import app from './app';

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        logger.info('Database connection established');

        await AppDataSource.runMigrations();
        logger.info('Migrations executed');

        app.listen(config.PORT, config.HOST, () => {
            logger.info(`Server is running on ${config.HOST}:${config.PORT}`);
            logger.level = config.LOG_LEVEL;
        });
    } catch (error) {
        logger.error('Error during Data Source initialization', error);
        process.exit(1);
    }
};

startServer().then(() => 'Starting Database...');
