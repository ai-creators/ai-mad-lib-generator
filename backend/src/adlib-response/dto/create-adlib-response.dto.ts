export class CreateAdlibResponseDto {
  adlibId: number;
  questions: { question: string; answer: string }[];
}
