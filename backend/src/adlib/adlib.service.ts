import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Adlib } from 'src/data-model/entities/adlib.schema';
import { Model } from 'mongoose';
import { AdlibPaginationDto } from './dto/adlib-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';

@Injectable()
export class AdlibService {
  constructor(@InjectModel(Adlib.name) private adlibModel: Model<Adlib>) {}

  async findAllPageable(
    adlibPagination: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    try {
      const response = await Pagination.paginate(
        this.adlibModel,
        adlibPagination,
      );
      console.log('RESPONSE: ', response);
      return response;
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }
}
