import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { GetAdlibDto } from 'src/adlib/dtos/get-adlib.dto';
import { AdlibService } from 'src/adlib/services/adlib/adlib.service';
import { PaginationResponse } from 'src/common/pagination/PaginationResponse';
import { PaginationDto } from 'src/common/pagination/dtos/Pagination.dto';
import { Adlib } from 'src/database/schemas/adlib.schema';

@Controller('adlib')
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
    getAdlibDto: GetAdlibDto,
  ): Promise<PaginationResponse<Adlib>> {
    return this.adlibService.getAdlibsPageable(getAdlibDto);
  }
}
