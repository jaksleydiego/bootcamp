// importando o Router a classe do express
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import FileController from './app/controllers/FileController';
// instanciando a rota
const routes = new Router();
const upload = multer(multerConfig);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.get('/appointment', AppointmentController.index);
routes.post('/appointment', AppointmentController.store);

routes.post('/files', upload.single('file'), FileController.store);

// exporta as rotas

export default routes;
