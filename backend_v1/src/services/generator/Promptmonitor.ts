import { Prompt } from './Prompt';

export class PromptMonitor {
    constructor(prompt: Prompt) {
        this.prompt = prompt;
        this.wordFrequency = {};
    }

    public logPrompt(): void {
        console.log(`[${new Date().toISOString()}] Created prompt with Patreon level "${this.prompt.getPatreonLevel()}", original text: "${this.prompt.getOriginalPrompt()}"`);
        this.updateWordFrequency();
    }

    public countKeyword(keyword: string): number {
        return (this.prompt.getOriginalPrompt().match(new RegExp(keyword, 'g')) || []).length;
    }

    private updateWordFrequency(): void {
        let words = this.prompt.getOriginalPrompt().split(/\s+/);
        words.forEach(word => {
            word = word.toLowerCase();
            if (!this.wordFrequency[word]) {
                this.wordFrequency[word] = 0;
            }
            this.wordFrequency[word]++;
        });
    }

    public getWordFrequency(): { [word: string]: number } {
        return this.wordFrequency;
    }

    // ... other monitoring methods ...

    private prompt: Prompt;
    private wordFrequency: { [word: string]: number };
}
