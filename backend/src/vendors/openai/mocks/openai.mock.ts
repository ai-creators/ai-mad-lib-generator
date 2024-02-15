import { Adlib } from 'src/data-model/entities';
import { OpenaiConfigDto } from '../dtos/openai-config.dto';
import { PromptDto } from '../dtos/prompt.dto';

export function mockOpenaiService() {
  return {
    createRandomPrompt: jest
      .fn()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementation((openaiConfig: OpenaiConfigDto) => {
        return Promise.resolve('Your mock prompt');
      }),
    createAdlib: jest
      .fn()
      .mockImplementation(
        (prompt: PromptDto, openaiConfig: OpenaiConfigDto) => {
          const adlib = new Adlib();
          adlib.prompt = prompt.prompt;
          adlib.text = 'Generated adlib text';
          adlib.title = 'Generated adlib title';
          adlib.temperature = openaiConfig.temperature;
          adlib.topP = openaiConfig.topP;
          adlib.categories = [];
          return Promise.resolve(adlib);
        },
      ),
  };
}

export function mockOpenAI() {
  return {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  };
}
