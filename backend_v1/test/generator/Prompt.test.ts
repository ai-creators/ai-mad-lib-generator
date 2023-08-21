
import { Prompt } from "../../src/services/generator/Prompt";

describe('Prompt Class Constructor Tests', () => {
    it('should create a Prompt instance with default values', () => {
        const promptInstance = new Prompt("Test prompt");
        expect(promptInstance).toBeTruthy();
        expect(promptInstance.getOriginalPrompt()).toBe("Test prompt");
        expect(promptInstance.getFilter()).toBe("neutral");
        expect(promptInstance.getPatreonLevel()).toBe("silver");
    });

    it('should create a Prompt instance with specified values for patreonLevel and filter', () => {
        const promptInstance = new Prompt("Test prompt", "gold", "funny");
        expect(promptInstance.getFilter()).toBe("funny");
        expect(promptInstance.getPatreonLevel()).toBe("gold");
    });

    it('should throw an error when the originalPrompt exceeds 50 words', () => {
        const longPrompt = "This is a very long prompt ".repeat(4) + "which should throw an error.";
        expect(() => new Prompt(longPrompt)).toThrow("The initial prompt cannot exceed 50 words.");
    });

    it('should set the default filter to "neutral"', () => {
        const promptInstance = new Prompt("Test prompt");
        expect(promptInstance.getFilter()).toBe("neutral");
    });
});

describe('Prompt Class setPromptLimits() and getPromptLimits() Tests', () => {
    const promptInstance = new Prompt("Test prompt");

    it('should set the prompt limits correctly', () => {
        promptInstance.setPromptLimits();
        expect(promptInstance.getPromptLimits()).toBe("Make sure it’s at least 3 sentences. The mad lib cannot exceed 50 words.");
    });

    it('should get the correct prompt limits', () => {
        expect(promptInstance.getPromptLimits()).toBe("Make sure it’s at least 3 sentences. The mad lib cannot exceed 50 words.");
    });
});

// Tests for getOriginalPrompt() method
describe('Prompt Class getOriginalPrompt() Tests', () => {
    const promptInstance = new Prompt("Test original prompt");

    it('should return the correct original prompt', () => {
        expect(promptInstance.getOriginalPrompt()).toBe("Test original prompt");
    });
});

// Tests for setLength() method
describe('Prompt Class setLength() Tests', () => {
    const promptInstance = new Prompt("Test prompt");

    it('should set the prompt length to "short"', () => {
        promptInstance.setLength("short");
        expect(promptInstance.getPrompt()).toContain("Keep the mad lib short");
    });

    it('should set the prompt length to "medium"', () => {
        promptInstance.setLength("medium");
        expect(promptInstance.getPrompt()).toContain("Keep the mad lib medium");
    });

    it('should set the prompt length to "long"', () => {
        promptInstance.setLength("long");
        expect(promptInstance.getPrompt()).toContain("Keep the mad lib long");
    });
});

// Tests for setMinimumSentences() and getMinimumSentences() methods
describe('Prompt Class setMinimumSentences() and getMinimumSentences() Tests', () => {
    const promptInstance = new Prompt("Test prompt");

    it('should set the minimum sentences correctly', () => {
        promptInstance.setMinimumSentences(5);
        expect(promptInstance.getMinimumSentences()).toBe("The AI must generate at least 5 sentences.");
    });

    it('should get the correct minimum sentences', () => {
        expect(promptInstance.getMinimumSentences()).toBe("The AI must generate at least 5 sentences.");
    });
});

describe('Prompt Class setFilter() and getFilter() Tests', () => {
    const promptInstance = new Prompt("Test prompt");

    it('should set the filter to "funny"', () => {
        promptInstance.setFilter("funny", ["funny", "serious", "crazy", "neutral"]);
        expect(promptInstance.getFilter()).toBe("funny");
    });

    it('should set the filter to "serious"', () => {
        promptInstance.setFilter("serious", ["funny", "serious", "crazy", "neutral"]);
        expect(promptInstance.getFilter()).toBe("serious");
    });

    // it('should throw an error for invalid filter type', () => {
    //     expect(() => promptInstance.setFilter("invalidFilter", ["funny", "serious", "crazy", "neutral"])).toThrow("Invalid filter type.");
    // });

    it('should get the correct filter type', () => {
        expect(promptInstance.getFilter()).toBe("serious");
    });
});

// Tests for getPrompt() method
describe('Prompt Class getPrompt() Tests', () => {
    const promptInstance = new Prompt("Test prompt for getPrompt", "platinum", "crazy");

    it('should return the correct prompt string', () => {
        const expectedPrompt = "Default rules Make sure it’s at least 3 sentences. The mad lib cannot exceed 50 words. The AI must generate at least 3 sentences.  Filter: crazy Test prompt for getPrompt";
        expect(promptInstance.getPrompt()).toBe(expectedPrompt);
    });
});

// Tests for getPatreonLevel() method
describe('Prompt Class getPatreonLevel() Tests', () => {
    const promptInstance = new Prompt("Test prompt", "gold");

    it('should return the correct Patreon level', () => {
        expect(promptInstance.getPatreonLevel()).toBe("gold");
    });
});
