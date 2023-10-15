import { Controller, Post } from '@nestjs/common';
import { Adlib } from 'src/database/schemas/adlib.schema';
import { Prompt } from 'src/generator/Prompt';
import { AdlibService } from 'src/generator/services/adlib/adlib.service';
import { OpenaiService } from 'src/vendors/openai/services/openai/openai.service';

@Controller('generator')
export class GeneratorController {
  constructor(
    private readonly adlibService: AdlibService,
    private readonly openaiService: OpenaiService,
  ) {}

  @Post('random')
  async generateRandomAdlib(): Promise<Adlib> {
    const prompt = new Prompt(await this.openaiService.createRandomPrompt());
    prompt.setLength('short');
    const generatedAdlib = await this.openaiService.createFromPrompt(prompt);

    return await this.adlibService.createAdlib(generatedAdlib);
  }
}
