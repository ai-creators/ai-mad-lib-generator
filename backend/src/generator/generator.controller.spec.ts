import { TestingModule, Test } from '@nestjs/testing';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';
import { mockGeneratorService } from './mocks/generator.mock';
import { AdlibValidator } from 'src/adlib/adlib-validator/adlib-validator';
import { OpenaiService } from 'src/vendors/openai/openai.service';
import { mockOpenaiService } from 'src/vendors/openai/mocks/openai.mock';
import { ThrottlerModule } from '@nestjs/throttler';

describe('GeneratorController', () => {
  let controller: GeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneratorController],
      imports: [
        ThrottlerModule.forRoot([
          {
            name: 'short',
            ttl: 1000,
            limit: 5,
          },
          {
            name: 'medium',
            ttl: 10000,
            limit: 20,
          },
          {
            name: 'long',
            ttl: 60000,
            limit: 100,
          },
        ]),
      ],
      providers: [
        {
          provide: GeneratorService,
          useValue: mockGeneratorService(),
        },
        AdlibValidator,
        {
          provide: OpenaiService,
          useValue: mockOpenaiService(),
        },
      ],
    }).compile();

    controller = module.get<GeneratorController>(GeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
