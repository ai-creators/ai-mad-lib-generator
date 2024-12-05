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

    const parsedAdlib = adlibEvent.parsed;

    const savedCategories = await this.categoryRepository.saveOrGet(
      parsedAdlib.categories,
    );

    const adlib = this.adlibFactory.create({
      id: await this.adlibRepository.newId(),
      title: parsedAdlib.title,
      prompt: prompt.getOriginalPrompt(),
      text: parsedAdlib.madlib,
      isHidden: false,
      isPg: parsedAdlib.isPg,
      isFeatured: false,
      temperature: command.temperature,
      categories: savedCategories.map((category) =>
        this.categoryFactory.createFromEntity(category),
      ),
    });

    await this.adlibRepository.save(adlib);

    return adlib.getId();
  }
}
