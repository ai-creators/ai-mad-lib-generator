import { IsNumber, Max, Min } from 'class-validator';

export class OpenaiConfigDto {
  @IsNumber()
  @Min(0)
  @Max(1)
  temperature: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  topP: number;
}
