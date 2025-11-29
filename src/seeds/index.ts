import 'reflect-metadata';
import AppDataSource from '../configs/data-source';
import { logger } from '../configs/winston.config';
import { seedUsers } from './users.seed';

async function main() {
    try {
        logger.info('Starting database seeding...');

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            logger.info('Database connection established');
        }

        await seedUsers();

        logger.info('Seeding completed successfully');
    } catch (error) {
        logger.error('Seeding failed:', error);
        process.exit(1);
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

if (require.main === module) {
    main();
}

export { seedUsers };
