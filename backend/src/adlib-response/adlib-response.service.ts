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
}
