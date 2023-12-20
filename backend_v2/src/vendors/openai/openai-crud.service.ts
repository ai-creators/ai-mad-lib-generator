import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/data-model';
import { Repository } from 'typeorm';

@Injectable()
export class OpenaiCrudService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findCategoryByName(name: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        name,
      },
    });
  }

  saveCategory(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }
}
