import { expect } from 'chai';
import { Model, UpdateWriteOpResult } from 'mongoose';
import Sinon from 'sinon';
import IError from '../../../src/Interfaces/IError';
import MotorcycleService from '../../../src/Services/motorcycle.service';
import { motorcycle, motorcycleDB, motorcycles, motorcyclesDB } from './mocks/motorcycles.mocks';

const esLintTeOdeio = 'Honda Cb 600f Hornet';

describe('Testes de motorcycle.services', function () {
  afterEach(function () {
    return Sinon.restore();
  });

  it('Deve criar uma novo moto', async function () {
    Sinon.stub(Model, 'create').resolves(motorcycleDB);
  
    const motorcycleService = new MotorcycleService();

    const serviceResponse = await motorcycleService.register({
      model: esLintTeOdeio,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });

    expect(serviceResponse).to.be.deep.equal(motorcycle);
  });

  it('Deve retornar NULL quando nenhuma moto for passado para função de domain', async function () {
    Sinon.stub(Model, 'create').resolves(null);
  
    const motorcycleService = new MotorcycleService();

    const serviceResponse = await motorcycleService.register({
      model: esLintTeOdeio,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });

    expect(serviceResponse).to.be.deep.equal(null);
  });

  it('Deve listar todas as motos', async function () {
    Sinon.stub(Model, 'find').resolves(motorcyclesDB);
  
    const motorcycleService = new MotorcycleService();

    const serviceResponse = await motorcycleService.getAllMotorcycles();

    expect(serviceResponse).to.be.deep.equal(motorcycles);
  });

  it('Deve retornar a moto com o id correto', async function () {
    Sinon.stub(Model, 'findById').resolves(motorcyclesDB[0]);
  
    const motorcycleService = new MotorcycleService();

    const serviceResponse = await motorcycleService.getMotorcycleById('6348513f34c397abcad040b2');

    expect(serviceResponse).to.be.deep.equal(motorcycle);
  });

  it('Deve lançar uma exceção caso id seja inválido', async function () {
    const motorcycleService = new MotorcycleService();
  
    try {
      await motorcycleService.getMotorcycleById('invalid id');
    } catch (err) {
      expect((err as IError).code).to.be.equal(422);
      expect((err as IError).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Deve lançar uma exceção caso o id não exista', async function () {
    Sinon.stub(Model, 'findById').resolves(null);
    const motorcycleService = new MotorcycleService();
  
    try {
      await motorcycleService.getMotorcycleById('6348513f34c397abcad040b3');
    } catch (err) {
      expect((err as IError).code).to.be.equal(404);
      expect((err as IError).message).to.be.equal('Motorcycle not found');
    }
  });

  it('Deve retornar a moto atualizado', async function () {
    Sinon.stub(Model, 'findById').resolves(motorcycleDB);
    Sinon.stub(Model, 'updateOne').resolves({} as UpdateWriteOpResult);
  
    const motorcycleService = new MotorcycleService();

    const motorcycleUpdated = {
      id: '634852326b35b59438fbea2f',
      model: esLintTeOdeio,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const serviceResponse = await motorcycleService.updateMotorcycle('634852326b35b59438fbea2f', {
      model: esLintTeOdeio,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    });

    expect(serviceResponse).to.be.deep.equal(motorcycleUpdated);
  });
});