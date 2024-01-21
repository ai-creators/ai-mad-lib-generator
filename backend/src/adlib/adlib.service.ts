import { Injectable } from '@nestjs/common';
import { CreateAdlibDto } from './dto/create-adlib.dto';
import { UpdateAdlibDto } from './dto/update-adlib.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Adlib } from 'src/data-model/entities/adlib.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdlibService {
  constructor(@InjectModel(Adlib.name) private adlibModel: Model<Adlib>) {}
}
