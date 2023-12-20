import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AdlibResponseService } from './adlib-response.service';
import { AdlibService } from 'src/adlib/adlib.service';
import { AdlibNotFoundException } from 'src/adlib/exceptions/adlib-not-found.exception';
import { AdlibResponse } from 'src/data-model/entities/adlib-response.entity';
import { AccountService } from 'src/account/account.service';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { AdlibResponseNotFound } from './exceptions/adlib-response-not-found.exception';

@Controller('v1/response')
export class AdlibResponseController {
  constructor(
    private readonly adlibResponseService: AdlibResponseService,
    private readonly adlibService: AdlibService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  async create(@Body() adlibResponse: AdlibResponse) {
    console.log('RESPONSE: ', adlibResponse);
    const foundAdlib = await this.adlibService.findOneById(
      adlibResponse.adlib.id,
    );
    if (!foundAdlib) {
      throw new AdlibNotFoundException();
    }

    if (adlibResponse.createdBy.id) {
      const foundAccount = await this.accountService.findOneById(
        adlibResponse.createdBy.id,
      );
      if (!foundAccount) {
        throw new AccountNotFoundException();
      }
    }
    return this.adlibResponseService.create(adlibResponse);
  }

  @Get('find')
  async findAdlibResponse(@Param('id') id: number) {
    const foundAdlibResponse = await this.adlibResponseService.findById(id);
    console.log('RESPONSE: ', foundAdlibResponse);
    if (!foundAdlibResponse) {
      throw new AdlibResponseNotFound();
    }
    return foundAdlibResponse;
  }

  // private isValidQuestions(questions: AdlibResponseQuestion[]): boolean {}
}
