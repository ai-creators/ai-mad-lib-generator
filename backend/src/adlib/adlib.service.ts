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

  findAllPageable(
    adlibPagination: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    return Pagination.paginate(this.adlibModel, adlibPagination);
  }

  findFeaturedPageable(
    adlibPagination: AdlibPaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    return Pagination.paginate(this.adlibModel, adlibPagination, {
      isFeatured: true,
    });
  }
}
