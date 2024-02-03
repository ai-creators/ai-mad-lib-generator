export class AdlibValidator {
  public isValidAdlib(adlibText: string): boolean {
    // Regular expression to match mad lib inputs (e.g., [noun], [adjective])
    const madLibInputRegex = /\[([a-zA-Z_]+)\]/g;

    const sentenceSplitRegex = /[.!?]/;

    // Check for complete sentences
    const sentences = adlibText
      .split(sentenceSplitRegex)
      .filter((sentence) => sentence.trim().length > 0);
    if (sentences.length === 0) {
      return false; // No complete sentences
    }

    // Check for minimum number of mad lib inputs
    const adlibInputs = adlibText.match(madLibInputRegex) || [];
    if (adlibInputs.length < 4) {
      return false; // Not enough mad lib inputs
    }

    // Check each mad lib input for correct format (no spaces, only underscores)
    for (const input of adlibInputs) {
      if (input.includes(' ')) {
        return false; // Found an input with spaces
      }
    }

    return true;
  }
}
