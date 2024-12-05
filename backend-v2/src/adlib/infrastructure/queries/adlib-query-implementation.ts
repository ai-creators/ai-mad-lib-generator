import { Injectable } from '@nestjs/common';
import { AdlibQuery } from 'src/adlib/application/adlib-query';
import { GetFeaturedAdlibsResult } from 'src/adlib/application/queries/get-featured-adlibs/get-featured-adlibs.result';
import { Adlib } from 'src/adlib/domain/adlib';
import { PageResult } from 'src/common/pagination/page-result';
import { Pagination } from 'src/common/pagination/pagination';
import { AdlibEntity } from '../entities/adlib.entity';
import { GetAdlibsResult } from 'src/adlib/application/queries/get-adlibs/get-adlibs.result';
import { FeedType } from 'src/common/domain/feed-type';
import { time } from 'console';

@Injectable()
export class AdlibQueryImplementation implements AdlibQuery {
  async getAdlibs(
    page: number,
    size: number,
    timestamp: Date,
    feedType: FeedType,
  ): Promise<PageResult<GetAdlibsResult>> {
    switch (feedType) {
      case FeedType.FEATURED:
        return this.getFeaturedAdlibs(page, size, timestamp);
      case FeedType.LATEST:
        return this.getLatestAdlibs(page, size, timestamp);
      case FeedType.OLDEST:
        return this.getOldestAdlib(page, size, timestamp);
    }
  }

  private async getOldestAdlib(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<GetAdlibsResult>> {
    const pageResult = await Pagination.paginate<GetAdlibsResult>(AdlibEntity, {
      page,
      size,
      timestamp,
      order: {
        createdAt: 'ASC',
      },
      resultsTransformer: (results: AdlibEntity[]) => {
        return results.map((adlibEntity) => {
          const result: GetFeaturedAdlibsResult = {
            id: adlibEntity.id,
            title: adlibEntity.title,
            prompt: adlibEntity.prompt,
            isPg: adlibEntity.isPg,
            categories: adlibEntity.categories.map((category) => ({
              id: category.id,
              name: category.name,
            })),
            createdAt: adlibEntity.createdAt,
            version: adlibEntity.version,
          };

          return result;
        });
      },
      relations: ['categories'],
    });

    return pageResult;
  }

  private async getLatestAdlibs(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<GetAdlibsResult>> {
    const pageResult = await Pagination.paginate<GetAdlibsResult>(AdlibEntity, {
      page,
      size,
      timestamp,
      order: {
        createdAt: 'DESC',
      },
      resultsTransformer: (results: AdlibEntity[]) => {
        return results.map((adlibEntity) => {
          const result: GetFeaturedAdlibsResult = {
            id: adlibEntity.id,
            title: adlibEntity.title,
            prompt: adlibEntity.prompt,
            isPg: adlibEntity.isPg,
            categories: adlibEntity.categories.map((category) => ({
              id: category.id,
              name: category.name,
            })),
            createdAt: adlibEntity.createdAt,
            version: adlibEntity.version,
          };

          return result;
        });
      },
      relations: ['categories'],
    });

    return pageResult;
  }

  async getFeaturedAdlibs(
    page: number,
    size: number,
    timestamp: Date,
  ): Promise<PageResult<GetFeaturedAdlibsResult>> {
    const pageResult = await Pagination.paginate<GetFeaturedAdlibsResult>(
      AdlibEntity,
      {
        page,
        size,
        timestamp,
        resultsTransformer: (results: AdlibEntity[]) => {
          return results.map((adlibEntity) => {
            const result: GetFeaturedAdlibsResult = {
              id: adlibEntity.id,
              title: adlibEntity.title,
              prompt: adlibEntity.prompt,
              isPg: adlibEntity.isPg,
              categories: adlibEntity.categories.map((category) => ({
                id: category.id,
                name: category.name,
              })),
              createdAt: adlibEntity.createdAt,
              version: adlibEntity.version,
            };

            return result;
          });
        },
        where: {
          isFeatured: true,
        },
        relations: ['categories'],
      },
    );

    return pageResult;
  }
}
