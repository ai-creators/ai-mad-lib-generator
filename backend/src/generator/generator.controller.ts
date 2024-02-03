import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GenerateAdlibDto } from './dto/generate-adlib.dto';
import { OpenaiConfigDto } from 'src/vendors/openai/dtos/openai-config.dto';
import { PromptDto } from 'src/vendors/openai/dtos/prompt.dto';
import { Adlib } from 'src/data-model/entities';
import { ErrorCreatingAdlibException } from 'src/vendors/openai/exceptions/error-creating-adlib.exception';
import { OpenaiService } from 'src/vendors/openai/openai.service';
import { AdlibValidator } from 'src/adlib/adlib-validator/adlib-validator';
import { ThrottlerBehindProxyGuard } from 'src/common/config/throttler-behind-proxy.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('/v1/generator')
export class GeneratorController {
  constructor(
    private readonly generatorService: GeneratorService,
    private readonly openaiService: OpenaiService,
    private readonly adlibValidator: AdlibValidator,
  ) {}

  @UseGuards(ThrottlerBehindProxyGuard)
  @Throttle({ default: { limit: 3, ttl: 180 } })
  @Post('/generate')
  async createAdlib(
    @Body() generateAdlibDto: GenerateAdlibDto,
    @Query() openaiConfig: OpenaiConfigDto,
  ) {
    const prompt = new PromptDto();
    prompt.prompt = generateAdlibDto.prompt;
    try {
      const createdAdLib: Adlib = await this.openaiService.createAdlib(
        prompt,
        openaiConfig,
      );
      if (
        !createdAdLib ||
        !this.adlibValidator.isValidAdlib(createdAdLib.text)
      ) {
        throw new ErrorCreatingAdlibException();
      }

      return this.generatorService.saveAdlib(createdAdLib);
    } catch (error: unknown) {
      throw new ErrorCreatingAdlibException();
    }
  }

  @UseGuards(ThrottlerBehindProxyGuard)
  @Throttle({ default: { limit: 3, ttl: 180 } })
  @Post('generate-random')
  async createRandomAdlib(@Query() openaiConfig: OpenaiConfigDto) {
    try {
      const prompt = new PromptDto();
      prompt.prompt = await this.openaiService.createRandomPrompt(openaiConfig);
      const createdAdLib: Adlib = await this.openaiService.createAdlib(
        prompt,
        openaiConfig,
      );
      if (
        !createdAdLib ||
        !this.adlibValidator.isValidAdlib(createdAdLib.text)
      ) {
        throw new ErrorCreatingAdlibException();
      }

      return this.generatorService.saveAdlib(createdAdLib);
    } catch (error: unknown) {
      throw new ErrorCreatingAdlibException();
    }
  }
}
