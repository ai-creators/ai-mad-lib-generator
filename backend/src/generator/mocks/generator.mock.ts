import { Adlib } from 'src/data-model/entities';

export function mockGeneratorService() {
  return {
    saveAdlib: jest.fn((adlib: Adlib): Promise<Adlib> => {
      return Promise.resolve(adlib);
    }),
  };
}
