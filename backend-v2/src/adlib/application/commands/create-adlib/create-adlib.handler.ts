import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAdlibCommand } from './create-adlib.command';
import { Id, IdImplementation } from 'src/common/domain/id';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection-token';
import { AdlibProperties } from 'src/adlib/domain/adlib';
import { Transactional } from 'lib/transactional';
import { AdlibFactory } from 'src/adlib/domain/adlib-factory';
import { OpenAIModel, OpenaiService } from 'lib/openai.module';
import { Prompt, PromptImplementation } from 'src/adlib/domain/prompt';
import { TemperatureImplementation } from 'src/adlib/domain/temperature';
import { AdlibRepository } from 'src/adlib/domain/adlib-repository';
import { CategoryFactory } from 'src/adlib/domain/category-factory';
import { CategoryRepository } from 'src/adlib/domain/category-repository';

@CommandHandler(CreateAdlibCommand)
export class CreateAdlibHandler
  implements ICommandHandler<CreateAdlibCommand, Id>
{
  @Inject(InjectionToken.ADLIB_REPOSITORY)
  private readonly adlibRepository: AdlibRepository;
  @Inject(InjectionToken.CATEGORY_REPOSITORY)
  private readonly categoryRepository: CategoryRepository;
  @Inject() private readonly openaiService: OpenaiService;

  @Inject()
  private readonly adlibFactory: AdlibFactory;

  @Inject()
  private readonly categoryFactory: CategoryFactory;

  @Transactional()
  async execute(command: CreateAdlibCommand): Promise<Id> {
    const prompt: Prompt = new PromptImplementation({
      originalPrompt: command.prompt,
    });
    const adlibEvent = await this.openaiService.createAdlib(prompt, {
      temperature: new TemperatureImplementation({
        temperature: command.temperature,
      }),
      model: OpenAIModel.GPT_4O,
    });

    const adlib = adlibEvent.parsed;

    const createdAtlib = this.adlibFactory.create({
      id: (await this.adlibRepository.newId()).toNumber(),
      title: adlib.title,
      prompt: prompt.getOriginalPrompt(),
      text: adlib.madlib,
      isHidden: false,
      isPg: adlib.isPg,
      isFeatured: false,
      temperature: command.temperature,
      categories: adlib.categories?.map((category) =>
        this.categoryFactory.create({ name: category }),
      ),
    });

    console.log('ADLIB EVENT: ', adlibEvent);

    return new IdImplementation(1);
  }
}
