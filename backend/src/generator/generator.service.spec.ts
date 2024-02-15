import { Test, TestingModule } from '@nestjs/testing';
import { GeneratorService } from './generator.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Adlib } from 'src/data-model/entities';
import { mockAdlibRepository } from 'src/adlib/mocks/adlib.mock';

describe('GeneratorService', () => {
  let service: GeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeneratorService,
        {
          provide: getRepositoryToken(Adlib),
          useFactory: mockAdlibRepository(),
        },
      ],
    }).compile();

    service = module.get<GeneratorService>(GeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
