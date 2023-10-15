import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class SearchAdlibDto {
  @IsNotEmpty()
  @IsString()
  search: string;
}
