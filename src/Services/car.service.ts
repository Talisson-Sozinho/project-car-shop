import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import IError from '../Interfaces/IError';
import CarODM from '../Models/car.model.odm';

class CarService {
  constructor(private _carModel = new CarODM()) {}
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      const newCar = new Car(car);
      return newCar;
    }
    return null;
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
    if (!/^[a-f\d]{24}$/i.test(id)) throw { code: 422, message: 'Invalid mongo id' } as IError;

    const car = await this._carModel.findById(id);

    if (!car) throw { code: 404, message: 'Car not found' } as IError;

    return this.createCarDomain(car);
  }
}

export default CarService;