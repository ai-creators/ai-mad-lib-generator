import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAdlibResponseDto } from 'src/adlib/dtos/create-adlib-response.dto';
import { GetAdlibByIdDto } from 'src/adlib/dtos/get-adlib-by-id.dto';
import { GetAdlibResponseByIdDto } from 'src/adlib/dtos/get-adlib-response-by-id.dto';
import { GetAdlibDto } from 'src/adlib/dtos/get-adlib.dto';
import { SearchAdlibDto } from 'src/adlib/dtos/search-adlib.dto';
import { AdlibNotFoundException } from 'src/adlib/exceptions/adlib-not-found.exception';
import { AdlibResponseNotFoundException } from 'src/adlib/exceptions/adlib-response-not-found.exception';
import { AdlibResponseService } from 'src/adlib/services/adlib-response/adlib-response.service';
import { AdlibService } from 'src/adlib/services/adlib/adlib.service';
import { PaginationResponse } from 'src/common/pagination/PaginationResponse';
import { PaginationDto } from 'src/common/pagination/dtos/Pagination.dto';
import { AdlibResponseAggregate } from 'src/database/models/adlib-repsonse-aggregate';
import { AdlibResponse } from 'src/database/schemas/adlib-response.schema';
import { Adlib } from 'src/database/schemas/adlib.schema';

@Controller('adlib')
export class AdlibController {
  constructor(
    private readonly adlibService: AdlibService,
    private readonly adlibResponseService: AdlibResponseService,
  ) {}
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

  @Get('featured')
  getFeatured(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    getAdlibDto: GetAdlibDto,
  ): Promise<PaginationResponse<Adlib>> {
    return this.adlibService.getFeaturedAdlibsPageable(getAdlibDto);
  }

  @Post('search')
  getBySearch(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    getAdlibDto: GetAdlibDto,
    @Body() searchAdlibDto: SearchAdlibDto,
  ): Promise<PaginationResponse<Adlib>> {
    return this.adlibService.searchAdlibsPageable(searchAdlibDto, getAdlibDto);
  }

  @Get('find')
  async getById(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    getAdlibByIdDto: GetAdlibByIdDto,
  ): Promise<Adlib> {
    const foundAdlib = await this.adlibService.getAdlibById(getAdlibByIdDto.id);
    if (!foundAdlib) {
      throw new AdlibNotFoundException();
    }
    return foundAdlib;
  }

  @Post('response')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  )
  async createAdlibResponse(
    @Body() createAdlibResponseDto: CreateAdlibResponseDto,
  ): Promise<AdlibResponse> {
    const adlibExist = await this.adlibService.getAdlibById(
      createAdlibResponseDto.adlibId,
    );
    if (!adlibExist) {
      throw new AdlibNotFoundException();
    }
    return this.adlibResponseService.createAdlibResponse(
      createAdlibResponseDto,
    );
  }

  @Get('response/find')
  async getAdlibResponseById(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    getAdlibResponseByIdDto: GetAdlibResponseByIdDto,
  ): Promise<AdlibResponseAggregate | AdlibResponse> {
    console.log;
    const foundAdlibResponse =
      await this.adlibResponseService.getAdlibResponseById(
        getAdlibResponseByIdDto.id,
      );
    if (!foundAdlibResponse) {
      throw new AdlibResponseNotFoundException();
    }
    const foundAdlib = await this.adlibService.getAdlibById(
      `${foundAdlibResponse.adlibId}`,
    );
    if (!foundAdlib) {
      throw new AdlibNotFoundException();
    }
    return {
      adlib: foundAdlib,
      adlibId: foundAdlibResponse.adlibId,
      questions: foundAdlibResponse.questions,
      _id: foundAdlibResponse._id,
    };
  }
}
