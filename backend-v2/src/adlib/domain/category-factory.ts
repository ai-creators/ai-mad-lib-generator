import { IdImplementation } from 'src/common/domain/id';
import { Category, CategoryImplementation } from './category';
import { CategoryEntity } from '../infrastructure/entities/category.entity';

export type CreateCategoryOptions = Readonly<{
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  version?: number;
}>;

export class CategoryFactory {
  create(options: CreateCategoryOptions): Category {
    return new CategoryImplementation({
      ...options,
      id: new IdImplementation(options.id),
      createdAt: options.createdAt ?? new Date(),
      updatedAt: options.updatedAt ?? new Date(),
      deletedAt: options.deletedAt ?? null,
      version: options.version ?? 0,
    });
  }

  createFromEntity(categoryEntity: CategoryEntity): Category {
    return this.create(categoryEntity);
  }
}
