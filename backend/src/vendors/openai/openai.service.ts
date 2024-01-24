import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenaiModelTypes } from './openai-model-types';
import { ChatCompletion } from 'openai/resources';
import { PromptDto } from './dtos/prompt.dto';
import { OpenaiConfigDto } from './dtos/openai-config.dto';
import { Adlib } from 'src/data-model/entities/adlib.schema';

@Injectable()
export class OpenaiService {
  constructor(
    private openai: OpenAI,
    private model: OpenaiModelTypes,
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
    const parsedMessage: any = JSON.parse(response.choices[0].message.content);
    const adlib = new Adlib();
    adlib.prompt = prompt.prompt;
    adlib.body = parsedMessage?.madlib;
    adlib.isPg = parsedMessage?.isPg;
    return adlib;
  }
}
