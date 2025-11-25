import { Router } from 'express';

import { healthController } from '../containers/health.container';

const healthRouter = Router();

healthRouter.get('/liveness', healthController.liveness);
healthRouter.get('/readiness', healthController.readiness);

export default healthRouter;
