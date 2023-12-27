import { Controller, Post, Body } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GenerateAdlibDto } from './dtos/generate-adlib.dto';
import { OpenaiService } from 'src/vendors/openai/openai.service';
import { Account, Adlib } from 'src/data-model';
import { ErrorCreatingAdlibException } from 'src/vendors/openai/exceptions/error-creating-adlib.exception';
import { PromptDto } from 'src/vendors/openai/dtos/prompt.dto';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { AdlibValidator } from 'src/common/validators/adlib-validator/adlib-validator';

@Controller('v1/generator')
export class GeneratorController {
  constructor(
    private readonly generatorService: GeneratorService,
    private readonly openaiService: OpenaiService,
    private readonly adlibValidator: AdlibValidator,
  ) {}

  @Post('/generate')
  async create(@Body() generateAdlibDto: GenerateAdlibDto) {
    const prompt = new PromptDto();
    prompt.prompt = generateAdlibDto.prompt;
    try {
      const createdAdLib: Adlib = await this.openaiService.createAdlib(prompt);
      if (
        !createdAdLib ||
        !this.adlibValidator.isValidAdlib(createdAdLib.body)
      ) {
        throw new ErrorCreatingAdlibException();
      }

      if (generateAdlibDto.userId) {
        const foundAccount = await this.findAccount(generateAdlibDto.userId);
        if (foundAccount) {
          createdAdLib.createdBy = Promise.resolve(foundAccount);
        }
      }

      return this.generatorService.saveAdlib(createdAdLib);
    } catch (error: unknown) {
      if (error instanceof AccountNotFoundException) {
        throw new AccountNotFoundException();
      }
      throw new ErrorCreatingAdlibException();
    }
  }

  private async findAccount(userId: number): Promise<Account> {
    const foundUser = await this.generatorService.findAccountById(userId);
    if (!foundUser) {
      throw new AccountNotFoundException();
    }
    return foundUser;
  }
}
