import { IsNotEmpty, IsString } from 'class-validator';

export class AdlibResponseIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
