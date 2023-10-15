import { Test, TestingModule } from '@nestjs/testing';
import { AdlibController } from './adlib.controller';

describe('AdlibController', () => {
  let controller: AdlibController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdlibController],
    }).compile();

    controller = module.get<AdlibController>(AdlibController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
