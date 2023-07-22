import { LibVendorResponseChoice } from "./LibVendorResponseChoice";

export type LibVendorResponse = {
  choices: LibVendorResponseChoice[];
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
};
