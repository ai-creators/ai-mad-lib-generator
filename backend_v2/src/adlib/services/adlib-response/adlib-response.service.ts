import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AdlibResponse } from 'src/database/schemas/adlib-response.schema';
import { CreateAdlibResponseDto } from 'src/adlib/dtos/create-adlib-response.dto';

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
}
