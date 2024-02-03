import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ValidationPipe,
  Put,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AdlibResponseService } from './adlib-response.service';
import { AdlibService } from 'src/adlib/adlib.service';
import { AdlibNotFoundException } from 'src/adlib/exceptions/adlib-not-found.exception';
import { AdlibResponse } from 'src/data-model/entities/adlib-response.entity';
import { AccountService } from 'src/account/account.service';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { AdlibResponseNotFound } from './exceptions/adlib-response-not-found.exception';
import { CreateAdlibResponseDto } from './dto/create-adlib-response.dto';
import { AdlibResponseQuestion } from 'src/data-model';
import { AdlibResponsePaginationDto } from './dto/adlib-response-pagination.dto';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { PermissionResponseDto } from './dto/permission-response.dto';
import { AdlibResponseIdDto } from './dto/adlib-response-id.dto';

@Controller('v1/response')
export class AdlibResponseController {
  constructor(
    private readonly adlibResponseService: AdlibResponseService,
    private readonly adlibService: AdlibService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  async create(@Body() createAdlibResponseDto: CreateAdlibResponseDto) {
    const adlibResponse = new AdlibResponse();
    const foundAdlib = await this.adlibService.findOneById(
      createAdlibResponseDto.adlibId,
    );
    if (!foundAdlib) {
      throw new AdlibNotFoundException();
    }
    adlibResponse.adlib = foundAdlib;
    if (createAdlibResponseDto.createdById) {
      const foundAccount = await this.accountService.findOneById(
        createAdlibResponseDto.createdById,
      );
      if (!foundAccount) {
        throw new AccountNotFoundException();
      }
      adlibResponse.createdBy = foundAccount;
    }
    adlibResponse.questions = this.mapQuestions(
      createAdlibResponseDto.questions,
    );
    return this.adlibResponseService.create(adlibResponse);
  }

  @Put(':repsonseId/permissions')
  @UseGuards(AuthorizationGuard)
  async updateResponsePermissions(
    @Param() adlibResponseIdDto: AdlibResponseIdDto,
    @Body() permissionResponseDto: PermissionResponseDto,
  ) {
    const foundResponse = await this.adlibResponseService.findById(
      adlibResponseIdDto.id,
    );
    if (!foundResponse) {
      throw new AdlibResponseNotFound();
    }
  }

  @Get('find')
  async findAdlibResponse(@Query('id') id: string) {
    if (!id) {
      throw new AdlibResponseNotFound();
    }
    const foundAdlibResponse = await this.adlibResponseService.findById(id);
    if (!foundAdlibResponse) {
      throw new AdlibResponseNotFound();
    }
    foundAdlibResponse.sortQuestions();
    return foundAdlibResponse;
  }

  @Get('adlib/find')
  async findAdlibsByResponse(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    adlibResponsePaginationDto: AdlibResponsePaginationDto,
  ) {
    const foundAdlib = await this.adlibService.findOneById(
      adlibResponsePaginationDto.id,
    );
    if (!foundAdlib) {
      throw new AdlibNotFoundException();
    }
    const results = await this.adlibResponseService.findPageable(
      adlibResponsePaginationDto,
    );
    results.results.forEach((result) => result.sortQuestions());
    return {
      adlib: foundAdlib,
      results,
    };
  }

  private mapQuestions(
    questions: {
      question: string;
      answer: string;
    }[],
  ): AdlibResponseQuestion[] {
    const output = [];
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const questionAsEntity = new AdlibResponseQuestion();
      questionAsEntity.question = question.question;
      questionAsEntity.answer = question.answer;
      questionAsEntity.order = i;
      output.push(questionAsEntity);
    }
    return output;
  }
}
