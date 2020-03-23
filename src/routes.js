import { Router } from 'express';
import multer from 'multer';

// CONTROLLERS IMPORTS
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import TransporterController from './app/controllers/TransporterController';
import FileController from './app/controllers/FileController';

import multerConfig from './config/multer';

import authMW from './app/middlewares/auth';

// UPLOAD OBJECT - randomNameMW; .single() method
const upload = multer(multerConfig);

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
// FILES
routes.get(
  '/transporters/:id/files',
  FileController.checkUserExists,
  FileController.index
);
routes.post(
  '/transporters/:id/files',
  FileController.checkUserExists,
  upload.single('file'),
  FileController.store
);

export default routes;
