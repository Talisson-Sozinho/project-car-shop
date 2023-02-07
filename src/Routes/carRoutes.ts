import { Router } from 'express';
import CarController from '../Controllers/car.controller';

const carRouter = Router();

const carController = new CarController();

carRouter.post('/', carController.create);

export default carRouter;
