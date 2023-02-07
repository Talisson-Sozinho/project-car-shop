import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/car.model.odm';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      const newCar = new Car(car);
      return newCar;
    }
    return null;
  }

  public async register(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }
}

export default CarService;