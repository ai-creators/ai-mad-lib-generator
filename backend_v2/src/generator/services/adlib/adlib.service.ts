import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GeneratedAdlib } from 'src/database/models/generated-adlib';
import { Adlib, AdlibDocument } from 'src/database/schemas/adlib.schema';

@Injectable()
export class AdlibService {
  constructor(@InjectModel(Adlib.name) private adlibModel: Model<Adlib>) {}

  public createAdlib(adlib: GeneratedAdlib): Promise<AdlibDocument> {
    return this.adlibModel.create(adlib);
  }
}
