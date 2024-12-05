import { Injectable, Module } from '@nestjs/common';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { ChatCompletion } from 'openai/resources';
import { Temperature } from 'src/adlib/domain/temperature';
import { Prompt } from 'src/adlib/domain/prompt';
import { ConfigService } from '@nestjs/config';

export enum OpenAIModel {
  GPT_4O = 'gpt-4o',
}

export interface OpenAIConfig {
  temperature: Temperature;
  model: OpenAIModel;
  responseFormat: z.ZodObject<any>;
}

export interface AdlibConfig {
  temperature: Temperature;
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
      response_format: zodResponseFormat(config.responseFormat, 'event'),
    });
  }

  public async createAdlib(
    prompt: Prompt,
    config: AdlibConfig,
  ): Promise<{
    role: string;
    content: string | null;
    refusal: string | null;
    tool_calls: [];
    parsed: z.infer<typeof MadlibEvent>;
    categories: string[];
  }> {
    const response: ChatCompletion = await this.chat(prompt.getValue(), {
      ...config,
      responseFormat: MadlibEvent,
    });

    const message = response.choices[0].message;

    let parsed: z.infer<typeof MadlibEvent>;

    try {
      const contentObject = JSON.parse(message.content || '{}');
      parsed = MadlibEvent.parse(contentObject);
    } catch (error) {
      console.error('Error parsing message content:', error);
      throw new Error('Invalid response format from OpenAI');
    }

    return {
      role: message.role,
      content: message.content,
      refusal: message.refusal,
      tool_calls: [],
      categories: parsed.categories ?? [],
      parsed,
    };
  }
}

@Module({
  providers: [
    {
      provide: OpenAI,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new OpenAI({ apiKey: configService.get('OPENAI_API_KEY') });
      },
    },
    OpenaiService,
  ],
  exports: [OpenaiService],
})
export class OpenaiModule {}
