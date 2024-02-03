import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdlibResponseService } from './adlib-response.service';
import { CreateAdlibResponseDto } from './dto/create-adlib-response.dto';
import { AdlibResponse, AdlibResponseQuestion } from 'src/data-model/entities';
import { AdlibService } from 'src/adlib/adlib.service';
import { AdlibNotFoundException } from 'src/adlib/exceptions/adlib-not-found.exception';
import { AdlibResponseNotFound } from './exceptions/adlib-response-not-found.exception';
import { AdlibResponseValidator } from './validators/adlib-response.validator';

@Controller('/v1/response')
export class AdlibResponseController {
  constructor(
    private readonly adlibResponseService: AdlibResponseService,
    private readonly adlibService: AdlibService,
  ) {}

  @Post()
  async create(@Body() createAdlibResponseDto: CreateAdlibResponseDto) {
    const response = new AdlibResponse();
    const foundAdlib = await this.adlibService.findOneById(
      createAdlibResponseDto.adlibId,
      [],
    );
    if (!foundAdlib) {
      throw new AdlibNotFoundException();
    }

    response.adlib = foundAdlib;

    response.questions = this.mapQuestions(createAdlibResponseDto.questions);

    if (!AdlibResponseValidator.validateQuestions(response.questions)) {
      throw new AdlibResponseNotFound();
    }

    console.log(response.questions);

    return this.adlibResponseService.create(response);
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

  @Get('find')
  async findAdlibResponse(@Query('id') id: number) {
    if (!id) {
      throw new AdlibResponseNotFound();
    }
    const foundAdlibResponse = await this.adlibResponseService.findById(id, [
      'adlib',
      'questions',
      'adlib.categories',
    ]);
    if (!foundAdlibResponse) {
      throw new AdlibResponseNotFound();
    }
    foundAdlibResponse.sortQuestions();
    return foundAdlibResponse;
  }
}
