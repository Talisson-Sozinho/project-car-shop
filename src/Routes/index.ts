import { Router } from 'express';
import carRouter from './carRoutes';
import motorcycleRouter from './motorcycleRoutes';

const routes = Router();

routes.use('/cars', carRouter);
routes.use('/motorcycles', motorcycleRouter);

export default routes;