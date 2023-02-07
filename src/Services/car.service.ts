import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import IError from '../Interfaces/IError';
import AbstractODM from '../Models/AbstractODM';
import carSchema from '../Models/schemas/carSchema';

class CarService {
  constructor(private _carModel = new AbstractODM(carSchema, 'Car')) {}
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      const newCar = new Car(car);
      return newCar;
    }
    return null;
  }

  private checkIfValidId(id: string) {
    if (!isValidObjectId(id)) throw { code: 422, message: 'Invalid mongo id' } as IError;
  }

  private async checkIfCarExists(id: string) {
    const car = await this._carModel.findById(id);
    if (!car) throw { code: 404, message: 'Car not found' } as IError;
    return car;
  }

  public async register(car: ICar) {
    const newCar = await this._carModel.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAllCars() {
    const allCars = await this._carModel.findAll();
    return allCars.map((car) => this.createCarDomain(car));
  }

  public async getCarById(id: string) {
    this.checkIfValidId(id);
    const car = await this.checkIfCarExists(id);
    return this.createCarDomain(car);
  }

  public async updateCar(id: string, car: ICar) {
    this.checkIfValidId(id);
    await this.checkIfCarExists(id);
    return this.createCarDomain(await this._carModel.updateOneById(id, car));
  }
}

export default CarService;