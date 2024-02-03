import { IsNumber } from 'class-validator';

export class FindAdlibDto {
  @IsNumber()
  adlibId: number;
}
