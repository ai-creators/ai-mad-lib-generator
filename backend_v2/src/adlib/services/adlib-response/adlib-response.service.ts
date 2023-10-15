import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  AdlibResponse,
  AdlibResponseDocument,
} from 'src/database/schemas/adlib-response.schema';
import { CreateAdlibResponseDto } from 'src/adlib/dtos/create-adlib-response.dto';
import { GetAdlibResponseByIdDto } from 'src/adlib/dtos/get-adlib-response-by-id.dto';

@Injectable()
export class AdlibResponseService {
  constructor(
    @InjectModel(AdlibResponse.name)
    private adlibResponseModel: Model<AdlibResponse>,
  ) {}

  createAdlibResponse(
    createAdlibResponseDto: CreateAdlibResponseDto,
  ): Promise<AdlibResponse> {
    return this.adlibResponseModel.create(createAdlibResponseDto);
  }

  getAdlibResponseById(id: string): Promise<AdlibResponseDocument> {
    return this.adlibResponseModel.findById(id);
  }
}
