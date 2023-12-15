import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenaiModelTypes } from './openai-model-types';
import { ChatCompletion } from 'openai/resources';

@Injectable()
export class OpenaiService {
  constructor(
    private openai: OpenAI = new OpenAI(),
    private model: OpenaiModelTypes,
  ) {}

  private async chat(prompt: string): Promise<ChatCompletion> {
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: this.model,
      response_format: { type: 'json_object' },
    });
    return completion;
  }
}
