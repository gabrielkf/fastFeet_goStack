import { Router } from 'express';
import multer from 'multer';

// CONTROLLERS IMPORTS
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import TransporterController from './app/controllers/TransporterController';
import FileController from './app/controllers/FileController';
import DeliverController from './app/controllers/DeliverController';

import multerConfig from './config/multer';

// import authMW from './app/middlewares/auth';

import User from './app/models/User';

// UPLOAD OBJECT - randomNameMW; .single() method
const upload = multer(multerConfig);

const routes = new Router();
routes.get('/test', async (req, res) => {
  const user = await User.findByPk(1);
  return res.json(user);
});

// SESSION CREATE
routes.post('/sessions', SessionController.store);

// JWT AUTH MW
// routes.use(authMW);

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
routes.post('/delivers', DeliverController.store);

export default routes;
