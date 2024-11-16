import { Injectable } from '@nestjs/common';
import { AdlibQuery } from 'src/adlib/application/adlib-query';
import { GetFeaturedAdlibsResult } from 'src/adlib/application/queries/get-featured-adlibs/get-featured-adlibs.result';
import { Adlib } from 'src/adlib/domain/adlib';
import { PageResult } from 'src/common/pagination/page-result';
import { Pagination } from 'src/common/pagination/pagination';
import { AdlibEntity } from '../entities/adlib.entity';

@Injectable()
export class AdlibQueryImplementation implements AdlibQuery {
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
