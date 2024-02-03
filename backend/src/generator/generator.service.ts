import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Adlib } from 'src/data-model/entities';
import { Repository } from 'typeorm';

@Injectable()
export class GeneratorService {
  constructor(
    @InjectRepository(Adlib)
    private readonly adlibRepository: Repository<Adlib>,
  ) {}

  saveAdlib(adlib: Adlib): Promise<Adlib> {
    return this.adlibRepository.save(adlib);
  }
}
