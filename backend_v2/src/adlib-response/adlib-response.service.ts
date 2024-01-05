import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdlibResponse } from 'src/data-model/entities/adlib-response.entity';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { AdlibResponsePaginationDto } from './dto/adlib-response-pagination.dto';
import { FeedTypes } from 'src/models/feed-type';

@Injectable()
export class AdlibResponseService {
  constructor(
    @InjectRepository(AdlibResponse)
    private readonly adlibResponseRepository: Repository<AdlibResponse>,
  ) {}

  create(adlibResponse: AdlibResponse) {
    return this.adlibResponseRepository.save(adlibResponse);
  }

  findPageable(
    adlibResponsePaginationDto: AdlibResponsePaginationDto,
  ): Promise<PaginationResponse<AdlibResponse>> {
    return Pagination.paginate<AdlibResponse>(
      this.adlibResponseRepository,
      adlibResponsePaginationDto,
      {
        where: {
          adlib: {
            id: adlibResponsePaginationDto.adlibId,
          },
        },
        order: this.calculateOrder(adlibResponsePaginationDto),
        relations: [
          'questions',
          'adlib',
          'adlib.categories',
          'adlib.createdBy',
          'createdBy',
        ],
      },
    );
  }

  findById(id: string) {
    return this.adlibResponseRepository.findOne({
      where: {
        id,
      },
      relations: [
        'questions',
        'adlib',
        'adlib.categories',
        'adlib.createdBy',
        'createdBy',
      ],
    });
  }

  private calculateOrder(adlibPaginationResponse: AdlibResponsePaginationDto): {
    createdAt: 'DESC' | 'ASC';
  } {
    const createdAt =
      adlibPaginationResponse.feedType === FeedTypes.LATEST
        ? 'DESC'
        : adlibPaginationResponse.feedType === FeedTypes.OLDEST
        ? 'ASC'
        : 'DESC';
    return {
      createdAt,
    };
  }
}
