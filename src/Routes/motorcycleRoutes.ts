import { Router } from 'express';
import MotorcycleController from '../Controllers/motorcycle.controller';

const motorcycleRouter = Router();

const motorcycleController = new MotorcycleController();

motorcycleRouter.post('/', motorcycleController.create);

motorcycleRouter.get('/', motorcycleController.allMotorcycles);

motorcycleRouter.get('/:id', motorcycleController.motorcyclesById);

motorcycleRouter.put('/:id', motorcycleController.updateMotorcyclesById);

export default motorcycleRouter;
