import { Test, TestingModule } from '@nestjs/testing';
import { AdlibService } from './adlib.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Adlib } from 'src/data-model/entities';
import { mockAdlibRepository } from './mocks/adlib.mock';

describe('AdlibService', () => {
  let service: AdlibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdlibService,
        {
          provide: getRepositoryToken(Adlib),
          useFactory: mockAdlibRepository(),
        },
      ],
    }).compile();

    service = module.get<AdlibService>(AdlibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
