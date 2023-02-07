import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/motorcycle.service';

class MotorcycleController {
  constructor(private _service = new MotorcycleService()) { }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMotorcycle = await this._service.register(req.body);
      return res.status(201).json(newMotorcycle);
    } catch (e) {
      next(e);
    }
  };
  public allMotorcycles = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceResponse = await this._service.getAllMotorcycles();
      return res.status(200).json(serviceResponse);
    } catch (e) {
      next(e);
    }
  };

  public motorcyclesById = async (req: Request, res:Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const serviceResponse = await this._service.getMotorcycleById(id);
      return res.status(200).json(serviceResponse);
    } catch (e) {
      next(e);
    }
  };

  public updateMotorcyclesById = async (req: Request, res:Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const serviceResponse = await this._service.updateMotorcycle(id, req.body);
      return res.status(200).json(serviceResponse);
    } catch (e) {
      next(e);
    }
  };
}
  
export default MotorcycleController;