import { Account, Adlib } from 'src/data-model';
export class CreateAdlibResponseDto {
  adlib: Adlib;
  questions: { question: string; answer: string }[];
  createdBy: Account;
}
