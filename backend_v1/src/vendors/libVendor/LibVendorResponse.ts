import { LibVendorResponseChoice } from "./LibVendorResponseChoice";

export type LibVendorResponse = {
  choices: {
    finish_reason: string | null;
    index: number;
    message: {
      content: string;
      role: string;
    };
  }[];
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
