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
      model: OpenaiModelTypes.GPT_4O,
      temperature: config.temperature || 0.7,
      top_p: config.topP || 1,
      response_format: { type: 'json_object' },
    });
  }

  public async createRandomPrompt(
    openaiConfig: OpenaiConfigDto,
  ): Promise<string> {
    const response: ChatCompletion = await this.chat(
      'Create a short prompt for a random short story. It should be completely random, I dont want the prompt to repeat. The response should be a json object with the key of prompt for the prompt. Keep it under 5 words.',
      openaiConfig,
    );
    const parsedMessage: any = JSON.parse(response.choices[0].message.content);
    return parsedMessage?.prompt;
  }

  public async createAdlib(
    prompt: PromptDto,
    openaiConfig: OpenaiConfigDto,
  ): Promise<Adlib> {
    try {
      const response: ChatCompletion = await this.chat(
        prompt.buildPrompt(),
        openaiConfig,
      );
      console.log(response);
      response.choices.forEach((element) => {
        console.log(element);
      });
      const parsedMessage: any = JSON.parse(
        response.choices[0].message.content,
      );
      const adlib = new Adlib();
      adlib.prompt = prompt.prompt;
      adlib.text = parsedMessage?.madlib;
      adlib.title = parsedMessage?.title;
      adlib.isPg = parsedMessage?.isPg;
      adlib.temperature = openaiConfig.temperature;
      adlib.topP = openaiConfig.topP;
      adlib.categories = await this.mapCategories(parsedMessage.categories);
      return adlib;
    } catch (err: unknown) {
      console.log(err);
    }
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
