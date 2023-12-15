import { Controller, Post, Body } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GenerateAdlibDto } from './dtos/generate-adlib.dto';
import { OpenaiService } from 'src/vendors/openai/openai.service';
import { Adlib } from 'src/data-model';
import { ErrorCreatingAdlibException } from 'src/vendors/openai/exceptions/error-creating-adlib.exception';
import { PromptDto } from 'src/vendors/openai/dtos/prompt.dto';

@Controller('v1/generator')
export class GeneratorController {
  constructor(
    private readonly generatorService: GeneratorService,
    private readonly openaiService: OpenaiService,
  ) {}

  @Post('/generate')
  async create(@Body() generateAdlibDto: GenerateAdlibDto) {
    const prompt = new PromptDto();
    prompt.prompt = generateAdlibDto.prompt;
    const createdAdLib: Adlib = await this.openaiService.createAdlib(prompt);
    if (!createdAdLib) {
      throw new ErrorCreatingAdlibException();
    }
    return new Adlib();
  }
}
