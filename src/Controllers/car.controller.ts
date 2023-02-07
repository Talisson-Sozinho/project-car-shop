import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/car.service';

class CarController {
  constructor(private _service = new CarService()) { }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCar = await this._service.register(req.body);
      return res.status(201).json(newCar);
    } catch (e) {
      next(e);
    }
  };

  public allCars = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allCars = await this._service.getAllCars();
      return res.status(200).json(allCars);
    } catch (e) {
      next(e);
    }
  };

  public carById = async (req: Request, res:Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const car = await this._service.getCarById(id);
      return res.status(200).json(car);
    } catch (e) {
      next(e);
    }
  };

  public updateCarById = async (req: Request, res:Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const carUpdated = await this._service.updateCar(id, req.body);
      return res.status(200).json(carUpdated);
    } catch (e) {
      next(e);
    }
  };
}
  
export default CarController;