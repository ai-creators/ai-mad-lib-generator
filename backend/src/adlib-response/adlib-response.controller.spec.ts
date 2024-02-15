import { Test, TestingModule } from '@nestjs/testing';
import { AdlibResponseController } from './adlib-response.controller';
import { AdlibResponseService } from './adlib-response.service';
import { mockAdlibResponseService } from './mocks/adlib-response.mock';
import { AdlibService } from 'src/adlib/adlib.service';
import { mockAdlibService } from 'src/adlib/mocks/adlib.mock';

describe('AdlibResponseController', () => {
  let controller: AdlibResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdlibResponseController],
      providers: [
        {
          provide: AdlibResponseService,
          useValue: mockAdlibResponseService(),
        },
        {
          provide: AdlibService,
          useValue: mockAdlibService(),
        },
      ],
    }).compile();

    controller = module.get<AdlibResponseController>(AdlibResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
