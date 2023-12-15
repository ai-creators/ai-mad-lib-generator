import { Controller, Post, Body } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GenerateAdlibDto } from './dtos/generate-adlib.dto';
import { OpenaiService } from 'src/vendors/openai/openai.service';

@Controller('v1/generator')
export class GeneratorController {
  constructor(
    private readonly generatorService: GeneratorService,
    private readonly openaiService: OpenaiService,
  ) {}

  @Post('/generate')
  create(@Body() generateAdlibDto: GenerateAdlibDto) {}
}
