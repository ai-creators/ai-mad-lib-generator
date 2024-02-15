import { Adlib } from 'src/data-model/entities';
import { AdlibPaginationDto } from '../dto/adlib-pagination.dto';
import { PaginationResponse } from 'src/common/pagination/dtos/pagination-response.dto';

export function mockAdlibService(adlibs: Adlib[] = []) {
  return {
    findAllPageable: jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (dto: AdlibPaginationDto): Promise<PaginationResponse<Adlib>> => {
        const mockAdlibs: Adlib[] = adlibs;
        return Promise.resolve({
          results: mockAdlibs,
          page: 1,
          size: mockAdlibs.length,
          totalPages: 1,
        });
      },
    ),
    findOneById: jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (id: number, relations: string[]): Promise<Adlib | null> => {
        const foundAdlib = new Adlib();
        foundAdlib.id = id;
        return Promise.resolve(foundAdlib);
      },
    ),
  };
}

export function mockAdlibRepository() {
  return () => ({
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(null),
      getMany: jest.fn().mockResolvedValue([]),
    })),
  });
}
