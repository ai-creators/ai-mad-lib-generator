import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CategoryFactory, CreateCategoryOptions } from './category-factory';
import { Category, CategoryImplementation } from './category';
import { Adlib, AdlibImplementation } from './adlib';
import { IdImplementation } from 'src/common/domain/id';
import { AdlibEntity } from '../infrastructure/entities/adlib.entity';

export type CreateAdlibOptions = Readonly<{
  id: string;
  oldId?: number;
  prompt: string;
  title: string;
  text: string;
  isHidden?: boolean;
  isPg?: boolean;
  isFeatured?: boolean;
  temperature: number;
  categories: CreateCategoryOptions[] | Category[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  version?: number;
}>;

export class AdlibFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  @Inject() private readonly categoryFactory: CategoryFactory;

  create(options: CreateAdlibOptions): Adlib {
    return new AdlibImplementation({
      ...options,
      id: new IdImplementation(options.id),
      createdAt: options.createdAt ?? new Date(),
      updatedAt: options.updatedAt ?? new Date(),
      deletedAt: options.deletedAt ?? null,
      version: options.version ?? 0,
      categories: options.categories?.map(this.createCategory) ?? [],
    });
  }

  createFromEntity(adlibEntity: AdlibEntity): Adlib {
    return this.create(adlibEntity);
  }

  private createCategory(options: CreateCategoryOptions | Category): Category {
    if (options instanceof CategoryImplementation) {
      return options;
    }

    return this.categoryFactory.create(options as CreateCategoryOptions);
  }
}
