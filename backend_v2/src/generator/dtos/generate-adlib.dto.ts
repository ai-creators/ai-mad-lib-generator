import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GenerateAdlibDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  prompt: string;

  userId: number | null;
}
