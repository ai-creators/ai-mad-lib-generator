import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { GeneratedAdlib } from 'src/database/models/generated-adlib';
import { Adlib } from 'src/database/schemas/adlib.schema';
import { Prompt } from 'src/generator/Prompt';

@Injectable()
export class OpenaiService {
  openaiApi: OpenAI;
  private temperature: number;
  private model: string;
  private static readonly RANDOM_PROMPT_QUERY: string =
    'Create a 5-8 word prompt for a short story without quotes';

  constructor(private configService: ConfigService) {
    this.openaiApi = new OpenAI({
      apiKey: configService.get<string>('OPEN_AI_API_KEY'),
    });
    this.temperature = 0.5;
    this.model = configService.get<string>('OPEN_AI_API_MODEL');
  }

  async createFromPrompt(prompt: Prompt): Promise<GeneratedAdlib> {
    try {
      const response: any = await this.openaiApi.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: prompt.getPrompt() }],
        temperature: this.temperature,
      });
      this.validateGeneratedAdlib(response);
      return {
        prompt: prompt.getOriginalPrompt(),
        text: response.choices[0].message.content,
      };
    } catch (e: unknown) {
      throw e;
    }
  }

  async createRandomPrompt(): Promise<string> {
    try {
      const response: any = await this.openaiApi.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'user', content: OpenaiService.RANDOM_PROMPT_QUERY },
        ],
        temperature: this.temperature,
      });
      return response.choices[0].message.content;
    } catch (e: unknown) {
      throw e;
    }
  }

  validateGeneratedAdlib(response: any) {
    const message = response.choices[0].message.content;
    if (!message.includes('[') && !message.includes(']')) {
      if (message.includes('sorry')) {
        throw new Error(
          'Unable to create ad-lib based on inappropriate language.',
        );
      } else {
        throw new Error('Unable to generate the ad-lib');
      }
    }
  }
}
