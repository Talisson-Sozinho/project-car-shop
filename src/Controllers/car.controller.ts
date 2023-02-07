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
}
  
export default CarController;