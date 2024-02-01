import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdlibResponse } from 'src/data-model/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AdlibResponseService {
  constructor(
    @InjectRepository(AdlibResponse)
    private readonly adlibResponseRepository: Repository<AdlibResponse>,
  ) {}

  create(adlibResponse: AdlibResponse) {
    return this.adlibResponseRepository.save(adlibResponse);
  }

  findById(id: number, relations: string[]): Promise<AdlibResponse | null> {
    if (!id) {
      return null;
    }
    const entityName = 'AdlibResponse';
    const queryBuilder =
      this.adlibResponseRepository.createQueryBuilder(entityName);

    if (relations.includes('questions')) {
      queryBuilder.leftJoinAndSelect(`${entityName}.questions`, 'question');
    }

    if (relations.includes('adlib')) {
      queryBuilder.leftJoinAndSelect(`${entityName}.adlib`, 'adlib');
    }

    queryBuilder.where(`${entityName}.id = :id`, {
      id,
    });

    return queryBuilder.getOne();
  }
}
