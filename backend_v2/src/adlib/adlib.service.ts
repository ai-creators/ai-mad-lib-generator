import { Injectable } from '@nestjs/common';
import { CreateAdlibDto } from './dto/create-adlib.dto';
import { UpdateAdlibDto } from './dto/update-adlib.dto';

@Injectable()
export class AdlibService {
  create(createAdlibDto: CreateAdlibDto) {
    return 'This action adds a new adlib';
  }

  findAll() {
    return `This action returns all adlib`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adlib`;
  }

  update(id: number, updateAdlibDto: UpdateAdlibDto) {
    return `This action updates a #${id} adlib`;
  }

  remove(id: number) {
    return `This action removes a #${id} adlib`;
  }
}
