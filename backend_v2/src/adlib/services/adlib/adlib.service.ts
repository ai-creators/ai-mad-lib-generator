import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Adlib } from 'src/database/schemas/adlib.schema';
import { PaginationDto } from 'src/common/pagination/dtos/Pagination.dto';
import { PaginationResponse } from 'src/common/pagination/PaginationResponse';
import { Pagination } from 'src/common/pagination';
import { GetAdlibDto } from 'src/adlib/dtos/get-adlib.dto';

@Injectable()
export class AdlibService {
  constructor(@InjectModel(Adlib.name) private adlibModel: Model<Adlib>) {}

  public getAdlibsPageable(
    getAdlibDto: GetAdlibDto,
  ): Promise<PaginationResponse<Adlib>> {
    return Pagination.paginate(
      { isPG: getAdlibDto.isPG },
      getAdlibDto,
      this.adlibModel,
    );
  }
}
