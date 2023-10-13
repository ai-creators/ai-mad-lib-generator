import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Adlib } from 'src/database/schemas/adlib.schema';
import { PaginationDto } from 'src/common/pagination/dtos/Pagination.dto';
import { PaginationResponse } from 'src/common/pagination/PaginationResponse';
import { Pagination } from 'src/common/pagination';
import { GetAdlibDto } from 'src/adlib/dtos/get-adlib.dto';
import { AdlibFeature } from 'src/database/schemas/adlib-feature.schema';
import { SearchAdlibDto } from 'src/adlib/dtos/search-adlib.dto';
import { GetAdlibByIdDto } from 'src/adlib/dtos/get-adlib-by-id.dto';

@Injectable()
export class AdlibService {
  constructor(
    @InjectModel(Adlib.name) private adlibModel: Model<Adlib>,
    @InjectModel(AdlibFeature.name)
    private adlibFeatureModel: Model<AdlibFeature>,
  ) {}

  public getAdlibsPageable(
    getAdlibDto: GetAdlibDto,
  ): Promise<PaginationResponse<Adlib>> {
    return Pagination.paginate(
      { isPG: getAdlibDto.isPG },
      getAdlibDto,
      this.adlibModel,
    );
  }

  public getFeaturedAdlibsPageable(
    getAdlibDto: GetAdlibDto,
  ): Promise<PaginationResponse<Adlib>> {
    return Pagination.paginate(
      { isPG: getAdlibDto.isPG },
      getAdlibDto,
      this.adlibFeatureModel,
    );
  }

  public searchAdlibsPageable(
    { search }: SearchAdlibDto,
    getAdlibDto: GetAdlibDto,
  ): Promise<PaginationResponse<Adlib>> {
    return Pagination.paginate(
      {
        isPG: getAdlibDto.isPG,
        $or: [
          { prompt: { $regex: search, $options: 'i' } },
          { text: { $regex: search, $options: 'i' } },
        ],
      },
      getAdlibDto,
      this.adlibModel,
    );
  }

  public getAdlibById(id: string): Promise<Adlib> {
    return this.adlibModel.findById(id);
  }
}
