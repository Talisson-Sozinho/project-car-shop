import { Model, Schema, models, model, UpdateQuery } from 'mongoose';

class AbstractODM<T> {
  private _schema: Schema<T>;
  private _model: Model<T>;

  constructor(schema: Schema<T>, modelName: string) {
    this._schema = schema;
    this._model = models[modelName] || model(modelName, this._schema);
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async findAll() {
    return this._model.find();
  }

  public async findById(id: string) {
    return this._model.findById(id);
  }

  public async updateOneById(id: string, obj: T): Promise<T> {
    await this._model.updateOne({ _id: id }, { ...obj } as UpdateQuery<T>);
    return { _id: id, ...obj };
  }
}

export default AbstractODM;