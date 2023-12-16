import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { Adlib } from 'src/data-model';
import { PaginationResponse } from './dto/pagination-response';

@Controller('v1/adlib')
export class AdlibController {
  constructor(private readonly adlibService: AdlibService) {}

  @Get()
  getAdlibs(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<Adlib>> {
    return this.adlibService.findAllPageable(paginationDto);
  }
}
