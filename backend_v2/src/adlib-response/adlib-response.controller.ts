import { Controller, Post, Body } from '@nestjs/common';
import { AdlibResponseService } from './adlib-response.service';
import { CreateAdlibResponseDto } from './dto/create-adlib-response.dto';
import { AdlibService } from 'src/adlib/adlib.service';
import { AdlibNotFoundException } from 'src/adlib/exceptions/adlib-not-found.exception';
import { AdlibResponse } from 'src/data-model/entities/adlib-response.entity';

@Controller('v1/response')
export class AdlibResponseController {
  constructor(
    private readonly adlibResponseService: AdlibResponseService,
    private readonly adlibService: AdlibService,
  ) {}

  @Post()
  async create(@Body() createAdlibResponseDto: CreateAdlibResponseDto) {
    const foundAdlib = await this.adlibService.findOneById(
      createAdlibResponseDto.adlibId,
    );
    if (!foundAdlib) {
      throw new AdlibNotFoundException();
    }
    const adlibResponse = new AdlibResponse();
    adlibResponse.adlib = foundAdlib;

    return this.adlibResponseService.create(createAdlibResponseDto);
  }
}
