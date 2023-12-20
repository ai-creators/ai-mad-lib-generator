import { Controller, Post, Body } from '@nestjs/common';
import { AdlibResponseService } from './adlib-response.service';
import { CreateAdlibResponseDto } from './dto/create-adlib-response.dto';
import { AdlibService } from 'src/adlib/adlib.service';
import { AdlibNotFoundException } from 'src/adlib/exceptions/adlib-not-found.exception';
import { AdlibResponse } from 'src/data-model/entities/adlib-response.entity';
import { AccountService } from 'src/account/account.service';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { AdlibResponseQuestion } from 'src/data-model/entities/adlib-response-question.entity';

@Controller('v1/response')
export class AdlibResponseController {
  constructor(
    private readonly adlibResponseService: AdlibResponseService,
    private readonly adlibService: AdlibService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  async create(@Body() createAdlibResponseDto: CreateAdlibResponseDto) {
    const foundAdlib = await this.adlibService.findOneById(
      createAdlibResponseDto.adlib.id,
    );
    if (!foundAdlib) {
      throw new AdlibNotFoundException();
    }
    const foundAccount = await this.accountService.findOneById(
      createAdlibResponseDto.createdBy.id,
    );
    if (!foundAccount) {
      throw new AccountNotFoundException();
    }
    const adlibResponse = new AdlibResponse();
    adlibResponse.adlib = foundAdlib;
    adlibResponse.createdBy = foundAccount;
    adlibResponse.questions = createAdlibResponseDto.questions;

    return this.adlibResponseService.create(adlibResponse);
  }

  // private isValidQuestions(questions: AdlibResponseQuestion[]): boolean {}
}
