import { IsNotEmpty, IsString } from 'class-validator';

export class GetAdlibResponseByIdDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
