import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenaiModelTypes } from './openai-model-types';
import { ChatCompletion } from 'openai/resources';
import { Adlib } from 'src/data-model';
import { PromptDto } from './dtos/prompt.dto';

@Injectable()
export class OpenaiService {
  constructor(private openai: OpenAI, private model: OpenaiModelTypes) {}

  private chat(prompt: string): Promise<ChatCompletion> {
    return this.openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: this.model,
      response_format: { type: 'json_object' },
    });
  }

  public async createAdlib(prompt: PromptDto): Promise<Adlib> {
    const response: ChatCompletion = await this.chat(prompt.buildPrompt());
    console.log('RESPONSE: ', response.choices[0].message);
    return new Adlib();
  }
}
