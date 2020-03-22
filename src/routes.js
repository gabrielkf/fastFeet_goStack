import { Router } from 'express';

// CONTROLLERS IMPORTS
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import TransporterController from './app/controllers/TransporterController';

import authMW from './app/middlewares/auth';

const routes = new Router();

// AUTH routes
routes.post('/sessions', SessionController.store);

// JWT AUTH MW
routes.use(authMW);

// RECIPIENTS
routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);

// TRANSPORTERS
routes.get('/transporters', TransporterController.index);
routes.post('/transporters', TransporterController.store);
routes.put('/transporters', TransporterController.update);
routes.delete('/transporters/:id', TransporterController.delete);

export default routes;
