import { Router } from 'express';
import carRouter from './carRoutes';

const routes = Router();

routes.use('/cars', carRouter);

export default routes;