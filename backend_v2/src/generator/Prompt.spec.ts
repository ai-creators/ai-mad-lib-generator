import { Prompt } from './Prompt';

describe('Prompt', () => {
  it('Should be defined', () => {
    const prompt = new Prompt('');

    expect(prompt).toBeDefined();
  });
});
