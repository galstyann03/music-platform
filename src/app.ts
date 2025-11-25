import express from 'express';
import swaggerUi from 'swagger-ui-express';

import routes from './routes/index';
import swaggerSpec from './configs/swagger.config';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { morganMiddleware } from './middlewares/morgan.middleware';
import { addCors } from './middlewares/cors.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
addCors(app);
app.use(morganMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
