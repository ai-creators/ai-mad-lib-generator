import { Injectable } from '@nestjs/common';
import { CreateAdlibResponseDto } from './dto/create-adlib-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdlibResponse } from 'src/data-model/entities/adlib-response.entity';

@Injectable()
export class AdlibResponseService {
  constructor(
    @InjectRepository(AdlibResponse)
    private readonly adlibResponseRepository: Repository<AdlibResponse>,
  ) {}

  create(createAdlibResponseDto: CreateAdlibResponseDto) {
    return 'This action adds a new adlibResponse';
  }
}
