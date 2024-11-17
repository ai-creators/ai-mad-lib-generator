import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateAdlibRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  prompt: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  temperature: number;
}
