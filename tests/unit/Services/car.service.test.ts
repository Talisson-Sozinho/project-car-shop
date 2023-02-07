import { expect } from 'chai';
import { Model, UpdateWriteOpResult } from 'mongoose';
import Sinon from 'sinon';
import IError from '../../../src/Interfaces/IError';
import CarService from '../../../src/Services/car.service';
import { car, carDB, cars, carsDB } from './mocks/car.mocks';

describe('Testes de car.services', function () {
  afterEach(function () {
    return Sinon.restore();
  });

  it('Deve criar um novo carro', async function () {
    Sinon.stub(Model, 'create').resolves(carDB);
  
    const carService = new CarService();

    const serviceResponse = await carService.register({
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });

    expect(serviceResponse).to.be.deep.equal(car);
  });

  it('Deve retornar NULL quando nenhum car for passado para função de domain', async function () {
    Sinon.stub(Model, 'create').resolves(null);
  
    const carService = new CarService();

    const serviceResponse = await carService.register({
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });

    expect(serviceResponse).to.be.deep.equal(null);
  });

  it('Deve listar todos os carros', async function () {
    Sinon.stub(Model, 'find').resolves(carsDB);
  
    const carService = new CarService();

    const serviceResponse = await carService.getAllCars();

    expect(serviceResponse).to.be.deep.equal(cars);
  });

  it('Deve retornar o carro com o id correto', async function () {
    Sinon.stub(Model, 'findById').resolves(carsDB[0]);
  
    const carService = new CarService();

    const serviceResponse = await carService.getCarById('6348513f34c397abcad040b2');

    expect(serviceResponse).to.be.deep.equal(car);
  });

  it('Deve lançar uma exceção caso id seja inválido', async function () {
    const carService = new CarService();
  
    try {
      await carService.getCarById('invalid id');
    } catch (err) {
      expect((err as IError).code).to.be.equal(422);
      expect((err as IError).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Deve lançar uma exceção caso o id não exista', async function () {
    Sinon.stub(Model, 'findById').resolves(null);
    const carService = new CarService();
  
    try {
      await carService.getCarById('6348513f34c397abcad040b3');
    } catch (err) {
      expect((err as IError).code).to.be.equal(404);
      expect((err as IError).message).to.be.equal('Car not found');
    }
  });

  it('Deve retornar o carro atualizado', async function () {
    Sinon.stub(Model, 'findById').resolves(carDB);
    Sinon.stub(Model, 'updateOne').resolves({} as UpdateWriteOpResult);
  
    const carService = new CarService();

    const carUpdated = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    const serviceResponse = await carService.updateCar('6348513f34c397abcad040b2', {
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    });

    expect(serviceResponse).to.be.deep.equal(carUpdated);
  });
});