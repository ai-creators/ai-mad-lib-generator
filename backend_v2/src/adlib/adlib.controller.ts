import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AdlibService } from './adlib.service';
import { PaginationDto } from 'src/common/pagination/dtos/pagination-dto';
import { Account, Adlib } from 'src/data-model';
import { PaginationResponse } from './dto/pagination-response';
import { AdlibNotFoundException } from './exceptions/adlib-not-found.exception';

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

  @Get('find')
  async findAdlibById(@Query('id') id: number): Promise<Adlib> {
    const foundAdlib = await this.adlibService.findOneById(id);
    if (!foundAdlib) {
      throw new AdlibNotFoundException();
    }
    if (foundAdlib.createdBy) {
      this.removePrivateProperties(foundAdlib.createdBy);
    }
    return foundAdlib;
  }

  private removePrivateProperties(account: Account): void {
    account.sub = null;
  }
}
