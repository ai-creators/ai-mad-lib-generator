import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiCrudService } from './openai-crud.service';

describe('OpenaiCrudService', () => {
  let service: OpenaiCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenaiCrudService],
    }).compile();

    service = module.get<OpenaiCrudService>(OpenaiCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
