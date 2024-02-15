import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiService } from './openai.service';
import OpenAI from 'openai';
import { mockOpenAI } from './mocks/openai.mock';
import { CategoryService } from 'src/category/category.service';
import { mockCategoryService } from 'src/category/mocks/category.mock';
import { OpenaiModelTypes } from './openai-model-types';

describe('OpenaiService', () => {
  let service: OpenaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenaiService,
        {
          provide: OpenAI,
          useValue: mockOpenAI(),
        },
        {
          provide: 'OPENAI_MODEL_TYPE',
          useValue: OpenaiModelTypes.GPT_3_TURBO,
        },
        {
          provide: CategoryService,
          useValue: mockCategoryService(),
        },
      ],
    }).compile();

    service = module.get<OpenaiService>(OpenaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
