import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import IError from '../Interfaces/IError';
import AbstractODM from '../Models/AbstractODM';
import motorcycleSchema from '../Models/schemas/motorcycleSchema';

class MotorcycleService {
  constructor(private _motorcycleModel = new AbstractODM(motorcycleSchema, 'Motorcycle')) {}
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      const newMotorcycle = new Motorcycle(motorcycle);
      return newMotorcycle;
    }
    return null;
  }

  private _checkIfValidId(id: string) {
    if (!isValidObjectId(id)) throw { code: 422, message: 'Invalid mongo id' } as IError;
  }

  private async _checkIfMotorcycleExists(id: string) {
    const motorcycle = await this._motorcycleModel.findById(id);
    if (!motorcycle) throw { code: 404, message: 'Motorcycle not found' } as IError;
    return motorcycle;
  }

  public async register(motorcycle: IMotorcycle) {
    const newMotorcycle = await this._motorcycleModel.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAllMotorcycles() {
    const allMotorcycles = await this._motorcycleModel.findAll();
    return allMotorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async getMotorcycleById(id: string) {
    this._checkIfValidId(id);
    const motorcycle = await this._checkIfMotorcycleExists(id);
    return this.createMotorcycleDomain(motorcycle);
  }

  public async updateMotorcycle(id: string, motorcycle: IMotorcycle) {
    this._checkIfValidId(id);
    await this._checkIfMotorcycleExists(id);
    return this.createMotorcycleDomain(await this._motorcycleModel.updateOneById(id, motorcycle));
  }
}

export default MotorcycleService;