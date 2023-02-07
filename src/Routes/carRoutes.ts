import { Router } from 'express';
import CarController from '../Controllers/car.controller';

const carRouter = Router();

const carController = new CarController();

carRouter.post('/', carController.create);

carRouter.get('/', carController.allCars);

carRouter.get('/:id', carController.carById);

carRouter.put('/:id', carController.updateCarById);

export default carRouter;
