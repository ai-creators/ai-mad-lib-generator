import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto/pagination-dto';

@Controller('v1/adlib')
export class AdlibController {
  constructor(private readonly adlibService: AdlibService) {}

  // @Get()
  // getAdlibs(
  //   @Query(
  //     new ValidationPipe({
  //       transform: true,
  //       transformOptions: { enableImplicitConversion: true },
  //       forbidNonWhitelisted: true,
  //     }),
  //   )
  //   paginationDto: PaginationDto,
  // ) {

  //     return this.adlibService.findAllPageable(paginationDto);
  //   }
  // }
}
