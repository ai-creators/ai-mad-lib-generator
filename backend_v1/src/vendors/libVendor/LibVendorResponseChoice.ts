export type LibVendorResponseChoice = {
  finish_reason: string | null;
  index: number;
  message: {
    content: string;
    role: string;
  };
};
