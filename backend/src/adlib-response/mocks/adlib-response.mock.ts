import { AdlibResponse } from 'src/data-model/entities';

export function mockAdlibResponseService() {
  return {
    create: jest.fn((adlibResponse: AdlibResponse): Promise<AdlibResponse> => {
      return Promise.resolve(adlibResponse);
    }),
    findById: jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (id: number, relations: string[]): Promise<AdlibResponse> => {
        const foundAdlibResponse = new AdlibResponse();
        return Promise.resolve(foundAdlibResponse);
      },
    ),
  };
}

export function mockAdlibResponseRepository() {
  return () => ({
    save: jest.fn((adlibResponse) => Promise.resolve(adlibResponse)),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(new AdlibResponse()),
    })),
  });
}
