import { IsNotEmpty, IsString } from 'class-validator';

export class AdlibReactionDto {
  @IsString()
  @IsNotEmpty()
  adlibId: string;
}
