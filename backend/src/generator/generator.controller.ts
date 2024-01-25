import { Body, Controller, Post, Query } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GenerateAdlibDto } from './dto/generate-adlib.dto';
import { OpenaiConfigDto } from 'src/vendors/openai/dtos/openai-config.dto';
import { PromptDto } from 'src/vendors/openai/dtos/prompt.dto';
import { Adlib } from 'src/data-model/entities/adlib.schema';
import { ErrorCreatingAdlibException } from 'src/vendors/openai/exceptions/error-creating-adlib.exception';
import { OpenaiService } from 'src/vendors/openai/openai.service';
import { AdlibValidator } from 'src/adlib/adlib-validator/adlib-validator';

@Controller('/v1/generator')
export class GeneratorController {
  constructor(
    private readonly generatorService: GeneratorService,
    private readonly openaiService: OpenaiService,
    private readonly adlibValidator: AdlibValidator,
  ) {}

  @Post('/generate')
  async createAdlib(
    @Body() generateAdlibDto: GenerateAdlibDto,
    @Query() openaiConfig: OpenaiConfigDto,
  ) {
    console.log('HERE');
    const prompt = new PromptDto();
    prompt.prompt = generateAdlibDto.prompt;
    try {
      const createdAdLib: Adlib = await this.openaiService.createAdlib(
        prompt,
        openaiConfig,
      );
      if (
        !createdAdLib ||
        !this.adlibValidator.isValidAdlib(createdAdLib.body)
      ) {
        throw new ErrorCreatingAdlibException();
      }

      return this.generatorService.saveAdlib(createdAdLib);
    } catch (error: unknown) {
      throw new ErrorCreatingAdlibException();
    }
  }
}
