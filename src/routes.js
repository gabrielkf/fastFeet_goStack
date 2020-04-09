import { Router } from 'express';
import multer from 'multer';

// CONTROLLERS IMPORTS
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import TransporterController from './app/controllers/TransporterController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import PickupController from './app/controllers/PickupController';
import ProblemController from './app/controllers/ProblemController';

import multerConfig from './config/multer';

import authMW from './app/middlewares/auth';

// UPLOAD OBJECT - randomNameMW; .single() method
const upload = multer(multerConfig);

const routes = new Router();

//* ROUTES *//

// DELIVERIES ROUTES FOR TRANSPORTERS
routes.get(
  '/deliveries/:transporter_id',
  DeliveryController.index
);
routes.put(
  '/deliveries/:transporter_id/pickup',
  PickupController.pickup
);

// SESSION CREATE
routes.post('/sessions', SessionController.store);
// JWT AUTH MW
routes.use(authMW);

//* ALL ROUTES BELOW WILL REQUIRE JWT AUTH *//

// RECIPIENTS
routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);

// TRANSPORTERS
routes.get('/transporters', TransporterController.index);
routes.post('/transporters', TransporterController.store);
routes.put('/transporters', TransporterController.update);
routes.delete(
  '/transporters/:id',
  TransporterController.delete
);

// FILES
routes.get(
  '/transporters/:id/files',
  FileController.checkTransporter,
  FileController.index
);
routes.post(
  '/transporters/:id/files',
  FileController.checkTransporter,
  upload.single('file'),
  FileController.store
);

// DELIVERS
routes.post('/deliveries', DeliveryController.store);

export default routes;
