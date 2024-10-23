import { Injectable, Module } from '@nestjs/common';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { ChatCompletion } from 'openai/resources';
import { Temperature } from 'src/adlib/domain/temperature';
import { TopP } from 'src/adlib/domain/top-p';
import { Prompt } from 'src/adlib/domain/prompt';
import { Adlib } from 'src/adlib/domain/adlib';

export enum OpenAIModel {
  GPT_4O = 'gpt-4o',
}

export interface OpenAIConfig {
  temperature: Temperature;
  topP: TopP;
  model: OpenAIModel;
  responseFormat: z.ZodObject<any>;
}

export interface AdlibConfig {
  temperature: Temperature;
  topP: TopP;
  model: OpenAIModel;
}

const MadlibEvent = z.object({
  madlib: z.string(),
  title: z.string(),
  isPg: z.boolean(),
  categories: z.array(z.string()),
});

@Injectable()
export class OpenaiService {
  constructor(private readonly openai: OpenAI) {}

  private chat(prompt: string, config: OpenAIConfig): Promise<ChatCompletion> {
    return this.openai.beta.chat.completions.parse({
      model: config.model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: config.temperature.toNumber(),
      topP: config.topP.toNumber(),
      response_format: zodResponseFormat(config.responseFormat, 'event'),
    });
  }

  public async createAdlib(
    prompt: Prompt,
    config: AdlibConfig,
  ): Promise<Adlib> {
    const response: ChatCompletion = await this.chat(prompt.getValue(), {
      ...config,
      responseFormat: MadlibEvent,
    });
  }
}

@Module({})
export class OpenaiModule {}
