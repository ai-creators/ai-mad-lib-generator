export interface AdlibPlaceholder {
  type: string;
  index: number;
  original: string;
}

export interface ParsedAdlib {
  text: string; // original text with numbered placeholders
  placeholders: AdlibPlaceholder[];
}

export function parseAdlib(text: string): ParsedAdlib {
  const regex = /\[(.*?)\]/g;
  const placeholders: AdlibPlaceholder[] = [];
  let index = 0;

  // Replace [type] with numbered placeholders and collect metadata
  const parsedText = text.replace(regex, (match, type) => {
    placeholders.push({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      type: type.toLowerCase(),
      index: index,
      original: match,
    });
    index++;
    return `[${index}]`;
  });

  return {
    text: parsedText,
    placeholders,
  };
}

export function fillAdlib(
  parsedAdlib: ParsedAdlib,
  responses: string[],
): string {
  let filledText = parsedAdlib.text;
  responses.forEach((response, index) => {
    filledText = filledText.replace(`[${index + 1}]`, response);
  });
  return filledText;
}
