import { Body, Controller, Post } from '@nestjs/common';
import { AdlibResponseService } from './adlib-response.service';
import { CreateAdlibResponseDto } from './dto/create-adlib-response.dto';
import { AdlibResponse, AdlibResponseQuestion } from 'src/data-model/entities';
import { AdlibService } from 'src/adlib/adlib.service';
import { AdlibNotFoundException } from 'src/adlib/exceptions/adlib-not-found.exception';

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
}
