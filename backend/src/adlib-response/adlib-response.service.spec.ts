import { Test, TestingModule } from '@nestjs/testing';
import { AdlibResponseService } from './adlib-response.service';
import { mockAdlibResponseRepository } from './mocks/adlib-response.mock';
import { AdlibResponse } from 'src/data-model/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AdlibResponseService', () => {
  let service: AdlibResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdlibResponseService,
        {
          provide: getRepositoryToken(AdlibResponse),
          useFactory: mockAdlibResponseRepository(),
        },
      ],
    }).compile();

    service = module.get<AdlibResponseService>(AdlibResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
