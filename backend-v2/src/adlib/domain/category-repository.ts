import { CategoryEntity } from '../infrastructure/entities/category.entity';
import { Category } from './category';

export interface CategoryRepository {
  save(category: Category | Category[]): Promise<number[]>;
  saveOrGet(categories: string[]): Promise<CategoryEntity[]>;
}
