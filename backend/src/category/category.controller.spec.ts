import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { mockCategoryService } from './mocks/category.mock';
import { AdlibService } from 'src/adlib/adlib.service';
import { mockAdlibService } from 'src/adlib/mocks/adlib.mock';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService(),
        },
        {
          provide: AdlibService,
          useValue: mockAdlibService(),
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
