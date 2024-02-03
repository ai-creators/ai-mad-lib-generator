import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenaiModelTypes } from './openai-model-types';
import { ChatCompletion } from 'openai/resources';
import { PromptDto } from './dtos/prompt.dto';
import { OpenaiConfigDto } from './dtos/openai-config.dto';
import { Adlib, Category } from 'src/data-model/entities';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class OpenaiService {
  constructor(
    private openai: OpenAI,
    private model: OpenaiModelTypes,
    private readonly categoryService: CategoryService,
  ) {}

  private chat(
    prompt: string,
    config: OpenaiConfigDto,
  ): Promise<ChatCompletion> {
    return this.openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: this.model,
      temperature: config.temperature || 0.7,
      top_p: config.topP || 1,
      response_format: { type: 'json_object' },
    });
  }

  public async createAdlib(
    prompt: PromptDto,
    openaiConfig: OpenaiConfigDto,
  ): Promise<Adlib> {
    const response: ChatCompletion = await this.chat(
      prompt.buildPrompt(),
      openaiConfig,
    );
    console.log(response);
    const parsedMessage: any = JSON.parse(response.choices[0].message.content);
    console.log(parsedMessage);
    const adlib = new Adlib();
    adlib.prompt = prompt.prompt;
    adlib.text = parsedMessage?.madlib;
    adlib.title = parsedMessage?.title;
    adlib.isPg = parsedMessage?.isPg;
    adlib.temperature = openaiConfig.temperature;
    adlib.topP = openaiConfig.topP;
    adlib.categories = await this.mapCategories(parsedMessage.categories);
    return adlib;
  }

  private async mapCategories(categories: string[]): Promise<Category[]> {
    const outputCategories = [];
    for (const category of categories) {
      let categoryToAdd = await this.categoryService.findCategoryByName(
        category.toLowerCase(),
      );

      if (!categoryToAdd) {
        const newCategory = new Category();
        newCategory.name = category.toLowerCase();
        categoryToAdd = await this.categoryService.saveCategory(newCategory);
      }

      outputCategories.push(categoryToAdd);
    }
    return outputCategories;
  }
}
