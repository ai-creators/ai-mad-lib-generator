import { Account } from 'src/data-model';
export class CreateAdlibResponseDto {
  adlibId: number;
  questions: { question: string; answer: string }[];
  createdById: number;
}
