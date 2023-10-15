import { IsNotEmpty, IsString } from 'class-validator';

export class GetAdlibByIdDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
