export class CreateAdlibResponseDto {
  adlibId: string;
  questions: { question: string; answer: string }[];
  createdById: string;
}
