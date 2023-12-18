import { Controller, Post, Body } from '@nestjs/common';
import { AdlibResponseService } from './adlib-response.service';
import { CreateAdlibResponseDto } from './dto/create-adlib-response.dto';

@Controller('adlib-response')
export class AdlibResponseController {
  constructor(private readonly adlibResponseService: AdlibResponseService) {}

  @Post()
  create(@Body() createAdlibResponseDto: CreateAdlibResponseDto) {
    return this.adlibResponseService.create(createAdlibResponseDto);
  }
}
