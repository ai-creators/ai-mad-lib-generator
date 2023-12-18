import { Injectable } from '@nestjs/common';
import { CreateAdlibResponseDto } from './dto/create-adlib-response.dto';
import { UpdateAdlibResponseDto } from './dto/update-adlib-response.dto';

@Injectable()
export class AdlibResponseService {
  create(createAdlibResponseDto: CreateAdlibResponseDto) {
    return 'This action adds a new adlibResponse';
  }
}
