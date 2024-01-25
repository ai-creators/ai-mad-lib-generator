import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Adlib } from 'src/data-model/entities/adlib.schema';

@Injectable()
export class GeneratorService {
  constructor(@InjectModel(Adlib.name) private adlibModel: Model<Adlib>) {}

  saveAdlib(adlib: Adlib): Promise<Adlib> {
    const createdAdlib = new this.adlibModel(adlib);
    return createdAdlib.save();
  }
}
