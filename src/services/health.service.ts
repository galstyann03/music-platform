import AppDataSource from '../configs/data-source';

export class HealthService {
    liveness(): string {
        return 'ALIVE';
    }

    async readiness(): Promise<void> {
        const isConnected = AppDataSource.isInitialized;
        if (!isConnected) {
            throw new Error('Database connection not initialized');
        }
        await AppDataSource.query('SELECT 1');
    }
}
