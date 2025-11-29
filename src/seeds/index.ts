import 'reflect-metadata';
import AppDataSource from '../configs/data-source';
import { logger } from '../configs/winston.config';
import { seedBaseData } from './baseData.seed';
import { seedDependentData } from './dependentData.seed';

async function main() {
    try {
        logger.info('Starting database seeding...');

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            logger.info('Database connection established');
        }

        await seedBaseData();
        await seedDependentData();

        logger.info('All seeding completed successfully');
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

export { seedBaseData, seedDependentData };
