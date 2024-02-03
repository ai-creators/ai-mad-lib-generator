import { Test, TestingModule } from '@nestjs/testing';
import { AdlibResponseController } from './adlib-response.controller';
import { AdlibResponseService } from './adlib-response.service';

describe('AdlibResponseController', () => {
  let controller: AdlibResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdlibResponseController],
      providers: [AdlibResponseService],
    }).compile();

    controller = module.get<AdlibResponseController>(AdlibResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
