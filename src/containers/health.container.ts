import { HealthService } from '../services/health.service';
import { HealthController } from '../controllers/health.controller';

const healthService = new HealthService();
export const healthController = new HealthController(healthService);
