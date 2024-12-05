import { EntityId, writeConnection } from 'lib/database.module';
import { Adlib, AdlibProperties } from 'src/adlib/domain/adlib';
import { AdlibRepository } from 'src/adlib/domain/adlib-repository';
import { AdlibEntity } from '../entities/adlib.entity';

export class AdlibRepositoryImplementation implements AdlibRepository {
  async newId(): Promise<string> {
    return new EntityId().toString();
  }
  async save(data: Adlib | Adlib[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));

    await writeConnection.manager.getRepository(AdlibEntity).save(entities);
  }

  private modelToEntity(model: Adlib): AdlibEntity {
    const properties = JSON.parse(JSON.stringify(model)) as AdlibProperties;

    return {
      ...properties,
      id: model.getId().toString(),
      oldId: model.getOldId()?.toNumber(),
      categories: model.getCategories().map((category) => ({
        id: category.getId().toNumber(),
        name: category.getName(),
        createdAt: category.getCreatedAt(),
        updatedAt: category.getUpdatedAt(),
        deletedAt: category.getDeletedAt(),
        version: category.getVersion(),
      })),
    };
  }
}
