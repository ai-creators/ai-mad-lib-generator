import { Test, TestingModule } from '@nestjs/testing';
import { AdlibService } from './adlib.service';

describe('AdlibService', () => {
  let service: AdlibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdlibService],
    }).compile();

    service = module.get<AdlibService>(AdlibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
