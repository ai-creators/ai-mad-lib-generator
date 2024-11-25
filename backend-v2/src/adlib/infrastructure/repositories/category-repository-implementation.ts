import { Category, CategoryProperties } from 'src/adlib/domain/category';
import { CategoryRepository } from 'src/adlib/domain/category-repository';
import { CategoryEntity } from '../entities/category.entity';
import { writeConnection } from 'lib/database.module';
import { In } from 'typeorm';

export class CategoryRepositoryImplementation implements CategoryRepository {
  async save(data: Category | Category[]): Promise<number[]> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));

    const savedEntities = await writeConnection.manager
      .getRepository(CategoryEntity)
      .save(entities);

    return savedEntities.map((entity) => entity.id);
  }

  async saveOrGet(categories: string[]): Promise<CategoryEntity[]> {
    const repository = writeConnection.manager.getRepository(CategoryEntity);

    // Fetch existing categories from the database
    const existingCategories = await repository.find({
      where: { name: In(categories) },
    });

    // Extract the names of existing categories
    const existingCategoryNames = existingCategories.map(
      (category) => category.name,
    );

    // Determine which categories need to be created
    const newCategoryNames = categories.filter(
      (category) => !existingCategoryNames.includes(category),
    );

    const newCategories = newCategoryNames.map((name) => {
      const category = new CategoryEntity();
      category.name = name;
      return category;
    });

    const savedCategories = await repository.save(newCategories);

    return [...existingCategories, ...savedCategories];
  }

  private modelToEntity(model: Category): CategoryEntity {
    const properties = JSON.parse(JSON.stringify(model)) as CategoryProperties;

    return {
      ...properties,
      id: model.getId().toNumber(),
    };
  }
}
