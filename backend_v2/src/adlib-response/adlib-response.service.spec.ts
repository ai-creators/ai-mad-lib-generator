import { Test, TestingModule } from '@nestjs/testing';
import { AdlibResponseService } from './adlib-response.service';

describe('AdlibResponseService', () => {
  let service: AdlibResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdlibResponseService],
    }).compile();

    service = module.get<AdlibResponseService>(AdlibResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
